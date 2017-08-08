var app = (function() { //Модуль содержит корневое пространство имён (корневой модуль)
    var init;
	
    init = function ($container) {
        app.storage.init();
        app.pageCtrl.init($container);
    };
	
    return { init: init };
})();
