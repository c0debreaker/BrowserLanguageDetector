Browser Language Detector
=========================

There are different ways of detecting the language that is configured on our browsers. One way is thru the use of DOM object **window.navigator.language** and/or **window.navigator.userLanguage**. The Window.navigator read-only property returns a reference to the Navigator object, which can be queried for information about the application running the script. There are properties that can be retrieved reliably. However, there are also properties that can't be pulled reliably.

Detecting browser's language can easily be achieved on the server-side. We only need Apache. Most of the solutions I've found used another interpreter like PHP or JAVA. The server-side solution shown here is purely at Apache level. Using Window.navigator is unreliable.

Every time we make an HTTP call to the server like GET or POST method, the browser also sends **Accept-Language** in the **Request Header**. This header will be captured by our Apache rule(see below). What our Apache is going to do is just return it back as a Response Header. This is awesome since there is no third party application required that needs to parse the request. I've tried it on different browsers like Chrome, Firefox, IE and Safari and so far, it's working like a charm.

Here are the steps. This should be done on the UNIX machine running Apache

```
1. Create the file getlang.

   touch /var/www/getlang

2. Paste the below Apache config on sites-enabled/000-default. However, if website is using SSL, put it on default-ssl file.

<Location "/getlang">
    Header echo Accept-Language
    Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires "Thu, 01 Jan 1970 00:00:00 GMT"
</Location>

3. Restart Apache

```

How to use it:
```
<script>
    captureBrowserLanguage(function(language) {
        console.log("Browser language : " + language );
        // You can use it with i18next library
        // i18n.init({ lng: language})
    });
</script>
```