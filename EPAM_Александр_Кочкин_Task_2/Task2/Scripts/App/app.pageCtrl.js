app.pageCtrl = (function() {
    var configMap = {
            mainHtml: null
        },
        stateMap = {
            $container: null
        },
        bodyInnerBlock, init;
    $.ajax({
        url: 'HTML/main.html',
        method: 'GET',
        dataType: 'html',
        async: false,
        success: function (data) {
            configMap.mainHtml = data;
        }
    });
    init = function ($container) {
		var templBody;
        templBody = configMap.mainHtml;
        bodyInnerBlock = _.template(templBody)({
            
        });
        stateMap.$container = $container;
        $container.html(bodyInnerBlock);
        app.pageView.init();
    };
    return {
        init: init
    };
})();