(function() {

    captureBrowserLanguage = function(callback) {
        var lang, _ref;
        $.ajax({
            type: "GET",
            url: "/getlang",
            cache: false,
            success: function(data, textStatus, xhr) {
                lang = (_ref = xhr.getResponseHeader("Accept-Language")) != null ? _ref.substring(0, 2) : void 0;
                captureBrowserLanguage = (lang !== void 0 ? lang : "en");
                callback(captureBrowserLanguage);
            }
        });
    }

})();
