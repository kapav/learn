app.pageCtrl = (function() {  //Модуль управляет отображением и хранилищами
    var configMap = {
            mainHtml: null,
            appendTableRow: app.utilBrowser.appendTableRow
        },
        stateMap = {
            $container: null
        },
        jqueryMap = {
            $container: null,
            $tbodyElement: null,
			$filter: null
		},
        setJqueryMap, onProductAdd, onFilterAdd, init;
		
    $.ajax({ //Получение вёрстки основной части страницы
        url: 'HTML/main.html',
        async: false,
        success: function (data) {
            configMap.mainHtml = data;
        }
    });
	
    setJqueryMap = function() { //Карта блоков jQuery вёрстки
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container,
            $tbodyElement: $($container).find('#tbodyElement')[0],
			$filter: $($container).find('#filterInput')[0]
        };
    };
	
    onProductAdd = function(event, addProduct) { //Обрабатывает добавление товара
        configMap.appendTableRow.call(jqueryMap.$tbodyElement, addProduct);
    };
	
	onFilterAdd = function(event, addFilter) { //Обрабатывает добавление фильтра
		jqueryMap.$filter.value = addFilter;
	};
	
    init = function ($container) {
        var templBody, bodyInnerBlock, params;
        templBody = configMap.mainHtml;
        bodyInnerBlock = _.template(templBody)();
        stateMap.$container = $container;
        stateMap.$container.html(bodyInnerBlock);
        setJqueryMap();
		params = {
			$container: jqueryMap.$container,
			$tbodyElement: jqueryMap.$tbodyElement
		};
        app.pageView.init(params);
        $.gevent.subscribe(jqueryMap.$container, 'productAdd', onProductAdd);
		$.gevent.subscribe(jqueryMap.$container, 'filterAdd', onFilterAdd);
    };
	
    return {
        init: init
    };
})();