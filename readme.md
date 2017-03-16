HTML i18n
=========

This library allows to localize an html file using javascript an external content file

Getting Started
---------------

In a terminal inside your project directory

```
bower install htmli18n
```

In the header of your html page at the very begining even before other depenency

```
<head>
	<script src="bower_components/pegasus/dist/pegasus.min.js"></script>
	<script src="bower_components/htmli18n/dist/js/htmli18n.js"></script>
	...
</head>
```

Then in your placeholder you want to localize

```
<i18n>
main.text.response
</i18n>
<img src="test.jpeg" alt="main.image.alt|i18n"/>
<input type="text" placeholder="main.input.placeholder|i18n"/>

```

Test
----

We will install a simple http server

```
npm install http-server -g
```

Go to your project directory and run

```
http-server .
```

Navigate to your html page


development
-----------

* build

```
gulp
```

* run

```
npm install http-server -g
http-server .
```

[open](http://127.0.0.1:8080)