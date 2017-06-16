var app = (function() {
    var init;
    init = function ($container) {
        app.storage.init();
        app.pageCtrl.init($container);
    };
    return { init: init };
})();
