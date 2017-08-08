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
        completeMainHtml, templReceiveMainHtml, setJqueryMap, onProductAdd, onFilterAdd, init;
		
    /*completeMainHtml = function() {
        $.ajax({
            url: 'HTML/main.html',
            async: true,
            error: function (xhr) {
                console.log('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
            },
            success: function (data) {
                configMap.mainHtml = data;
                console.log('completeMainHtml выполнен success');
            }
        });
    };
    templReceiveMainHtml = (function() {
        var obtain;
        obtain = function () {
            var take = app.templTaking.mockTake;
            take.on('templAchieve', completeMainHtml);
            take.emit('obtainTempl');
        };
        return {
            obtain: obtain
        };
    })();
	templReceiveMainHtml.obtain();
	setTimeout(function () {
		console.log('завершено ожидание completeMainHtml');
	}, 3000);*/
	
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