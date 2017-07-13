app.pageCtrl = (function() {
    var configMap = {
            mainHtml: null
        },
        stateMap = {
            $container: null
        },
        jqueryMap = {},
        setJqueryMap, bodyInnerBlock, init;
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
    init = function ($container) {
		var templBody;
        templBody = configMap.mainHtml;
        bodyInnerBlock = _.template(templBody)();
        stateMap.$container = $container;
        $container.html(bodyInnerBlock);
        setJqueryMap();
        app.pageView.init(jqueryMap.$tbodyElement);
    };
    return {
        init: init
    };
})();