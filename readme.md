# HTML i18n

This library allows to localize an html file using javascript an external content file

## Getting Started

In a terminal inside your project directory

```
bower install htmli18n
```

In the header of your html page at the very begining even before other dependency

```
<head>
	<script src="bower_components/pegasus/dist/pegasus.min.js"></script>
	<script src="bower_components/htmli18n/dist/js/htmli18n.js"></script>
	<script>
	i18n.setLanguage(['fr','en'],'fr','en').init();
	</script>
	...
</head>
```

i18n setLanguage(SUPPORTED_LANGUAGE,DEFAULT_LANGUAGE,FORCED_LANGUAGE)

This method will inject the information of your web application about supported language and default language. The last parameter is optional and for test only. This method will return the i18n object so you can chain with an init call that will fetch the right localization file and localize the page.

Then in your placeholder you want to localize

```
<i18n key="main.text.somethingElse">SEO can read that</i18n>
<i18n>
main.text.response
</i18n>
<img i18n-src="main.image.src|i18n" alt="main.image.alt|i18n"/>
<input type="text" placeholder="main.input.placeholder|i18n"/>
```

One more thing before starting
Create a file in a folder resources called
locale_en.json and do the same for all the language you want to support

```
{
	"main": {
		"title": {
			"tutorial": "Tutorial"
		},
		"label": {
			"question": "Is it in english?",
			"groovy": "{name} I am",
			"person": {
				"0": "Person",
				"1": "{n} persons",
				"2": "{n} persons",
				"3": "{n} persons",
				"n": "{n} persons",
				"gt99": "A lot of persons"
			}
		},
		"text": {
			"response": "Yes it is!"
		},
		"input": {
			"placeholder": "Your email here"
		},
		"image": {
			"alt": "This is validated",
			"src":"img/fancy_en.png"
		}
	}
}
```

Live test [here](http://codepen.io/anon/pen/PpQpLa)

## Advanced

The localization library support also the contextualization

```
<i18n context="{name:'Yoda'}">main.label.groovy</i18n>
<i18n context="0">main.label.person</i18n>
```

[(]read more](https://github.com/musterknabe/translate.js)

## Test

We will install a simple http server

```
npm install http-server -g
```

Go to your project directory and run

```
http-server .
```

[Open](http://127.0.0.1:8080) and navigate to your html page

## development

- build

```
gulp
```

- run

```
npm install http-server -g
http-server .
```

[open](http://127.0.0.1:8080)
