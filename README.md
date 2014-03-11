Browser Language Detector
=========================

There are different ways of detecting the language that is configured on our browsers. One way is thru the use of DOM object window.navigator.language and/or window.navigator.userLanguage. The Window.navigator read-only property returns a reference to the Navigator object, which can be queried for information about the application running the script. There are properties that can be retrieved reliably. However, there are also properties that can't be pulled reliably.

Detecting browser's language can easily be achieved on the service side. We only need Apache. Most of the solutions I've found used another interpreter like PHP or JAVA. The server-side solution that I'll be sharing is going to be served by purely by Apache.

Every time we make an HTTP call to the server like GET or POST method, the browser sends along the Accept-Language in the Request Header. This header will be captured by our Apache rule(see below) and all Apache does is return it back as a Response Header.

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