app.pageCtrl = (function() {
    var configMap = {
            mainHtml: app.templ.mainHtml
        },
        stateMap = {
            $container: null
        },
        bodyInnerBlock, init;
    init = function($container) {
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