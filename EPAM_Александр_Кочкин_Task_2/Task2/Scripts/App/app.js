var app = (function() {
    var templ, init;
    templ = {};
    init = function ($container) {
        app.storage.init();
        app.pageCtrl.init($container);
    };
    return {
        templ: templ,
        init: init
    };
})();
