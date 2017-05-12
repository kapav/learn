app.pageCtrl = (function() {
    var configMap = {
            mainHtml: app.templ
        },
        stateMap = {
            $container: null
        },
        init;
    init = function ($container) {
        stateMap.$container = $container;
        $container.html(configMap.mainHtml);
        app.pageView.init();
    };
    return { init: init };
})();