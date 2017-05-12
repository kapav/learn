var app = (function() {
    var init = function ($container) {
        app.storage.init();
        app.pageCtrl.init($container);
    };
    return { init: init };
})();
