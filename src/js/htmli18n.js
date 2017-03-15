/**
 * global object that allow the localization
 */
var i18n = {
	/**
	 * Force the language but must be called before the init
	 * @param {array} list of supported string like ['en'];
	 * @param {string} the default language
	 * @param {string} language free format
	 * @return this
	 */
	setLanguage: function(supported,
		defaultLang, ln) {
		i18n.language = ln;
		i18n.defaultLang = defaultLang || 'en';
		i18n.supported = supported || ['en'];
		return this;
	},
	/**
	 * This method must be called first it will load the content in // to other requests
	 */
	init: function(path, prefix, suffix) {
		//Default the parameters
		path = path || 'resources/';
		prefix = prefix || 'locale_';
		suffix = suffix || '.json';
		/*
		 * Detect the language of the browser
		 */
		var getLanguage = function(supported, defaultLang) {
			var lang = window.navigator.userLanguage || window.navigator.language;
			lang = lang.length > 2 ? lang.split("-")[0] : lang;
			return supported.indexOf(lang) > -1 ? lang : defaultLang;
		};
		/**
		 * This method must be called only once the init method is completed
		 */
		var _process = function(data, request) {
			if (data == null) {
				try {
					JSON.parse(request.responseText);
					_fail("Content is not defined");
				} catch (e) {
					_fail("Failed to parse the content", e);
				}

			} else {
				i18n.strings = data;
				i18n.localize();
			}
		};
		/**
		 * Failure to get the content
		 */
		var _fail = function(reason) {
			console.error("[I18N]:" + reason);
		};
		var request = pegasus(path + prefix + (i18n.language || getLanguage(i18n.supported, i18n.defaultLang)) + suffix);
		request.then(_process, _fail);
	},
	/**
	 * Search for string inside the json object
	 */
	_jsonWalker: function(obj, key) {
		var keys = key.split('.');
		key = keys.shift();
		if (obj == undefined || obj[key] == undefined) {
			//Add back the key
			keys.splice(0, 0, key);
			return "~~" + keys.join('.') + "~~";
		}
		if (typeof obj[key] == 'object') {
			return this._jsonWalker(obj[key], keys.join('.'));
		} else {
			return obj[key];
		}
	},
	/**
	 * To be called everytime you want to localize
	 */
	localize: function() {
		if (!i18n.strings) {
			throw "You must call the init method first"
		}

		/**
		 * Check if a string is localized or not
		 * @param {string} string to test
		 * @returns {boolean}
		 */
		var isStringLocalized = function(string) {

			function checker(s) {
				//Here we check the case where the key is not existing in the translation file so that we can reuse
				//the same function everywhere. Untranslated string are like '@lastPartOfTheKey@'
				if (s[0] === '@' && s[s.length - 1] === '@') {
					return false;
				}
				return (/\s/.test(s)) || s.indexOf('..') > -1 || s.split('.').length < 3;
			}

			var localized = true;
			if (!string) {
				return checker(string);
			}
			return false;
		};

		Array.prototype.slice.call(document.getElementsByTagName('i18n')).map(function(node) {
			if (!isStringLocalized(node.textContent)) {
				node.textContent = i18n._jsonWalker(i18n.strings, node.textContent.trim());
			}
		});
		Array.prototype.slice.call(document.getElementsByTagName('input')).map(function(node) {
			if (node.placeholder.indexOf('|i18n') > -1) {
				node.placeholder = i18n._jsonWalker(i18n.strings, node.placeholder.split("|")[0].trim());
			}
		});
		Array.prototype.slice.call(document.getElementsByTagName('img')).map(function(node) {
			if (node.alt.indexOf('|i18n') > -1) {
				node.alt = i18n._jsonWalker(i18n.strings, node.alt.split("|")[0].trim());
			}
		});
	}

};
//Add a trim function if not existing
if (!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	}
}