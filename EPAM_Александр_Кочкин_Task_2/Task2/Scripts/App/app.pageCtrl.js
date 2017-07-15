app.pageCtrl = (function() {
    var configMap = {
            mainHtml: null,
            appendTableRow: app.utilBrowser.appendTableRow
        },
        stateMap = {
            $container: null
        },
        jqueryMap = {},
        setJqueryMap, onAdd, init;
    $.ajax({
        url: 'HTML/main.html',
        async: false,
        success: function (data) {
            configMap.mainHtml = data;
        }
    });
    setJqueryMap = function() {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container,
            $tbodyElement: $($container).find('#tbodyElement')[0]
        };
    };
    onAdd = function(event, addProduct) {
        configMap.appendTableRow.call(jqueryMap.$tbodyElement, addProduct);
    };
    init = function ($container) {
        var templBody, bodyInnerBlock;
        templBody = configMap.mainHtml;
        bodyInnerBlock = _.template(templBody)();
        stateMap.$container = $container;
        $container.html(bodyInnerBlock);
        setJqueryMap();
        app.pageView.init(jqueryMap.$tbodyElement);
        $.gevent.subscribe($container, 'appAdd', onAdd);
    };
    return {
        init: init
    };
})();