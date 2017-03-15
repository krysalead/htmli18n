/**
 * global object that allow the localization
 */
var i18n = {
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
		var getLanguage = function() {
			var supported = ['en'];
			var defaultLang = 'en';
			var lang = window.navigator.userLanguage || window.navigator.language;
			lang = lang.length > 2 ? lang.split("-")[0] : lang;
			return supported.indexOf(lang) ? lang : defaultLang;
		};
		/**
		 * Search for string inside the json object
		 */
		var jsonWalker = function(obj, key) {
			var keys = key.split('.');
			key = keys.shift();
			if (obj == undefined || obj[key] == undefined) {
				//Add back the key
				keys.splice(0, 0, key);
				return "~~" + keys.join('.') + "~~";
			}
			if (typeof obj[key] == 'object') {
				return jsonWalker(obj[key], keys.join('.'));
			} else {
				return obj[key];
			}
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
				Array.prototype.slice.call(document.getElementsByTagName('i18n')).map(function(node) {
					node.textContent = jsonWalker(i18n.strings, node.textContent.trim());
				});
			}
		};
		/**
		 * Failure to get the content
		 */
		var _fail = function(reason) {
			console.error("[I18N]:" + reason);
		};
		var request = pegasus(path + prefix + getLanguage() + suffix);
		request.then(_process, _fail);
	}

};
//Add a trim function if not existing
if (!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	}
}