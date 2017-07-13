app.pageView = (function() {
    var configMap = {
            inventory: app.storage.inventory.getDb(),
            makeRenderMap: app.storage.inventory.makeRenderMap,
            render: app.utilBrowser.render,
            tbodyElement: null
        },
        onClickBtnFilter, onClickToggleSorting, init;
	onClickBtnFilter = function() {
		var dbFilter = document.forms.filterAndAddForm.filterName,
			dbFilterUpperCase = dbFilter.value.toUpperCase(),
			kindOfRenderMap = 'filter',
			renderMap;
		renderMap = configMap.makeRenderMap(kindOfRenderMap, dbFilterUpperCase);
		if (renderMap) {
		    configMap.render(configMap.inventory, renderMap, configMap.tbodyElement);
		}
	};
    onClickToggleSorting = function() {
		var selfOwn = this,
			kindOfRenderMap = 'sorting',
			renderMap;
		renderMap = configMap.makeRenderMap.call(selfOwn, kindOfRenderMap);
		configMap.render(configMap.inventory, renderMap, configMap.tbodyElement);
    };
    init = function(tbodyElement) {
        var dbBtnFilter = document.forms.filterAndAddForm.filterProduct,
			toggleName = document.forms.toggleNameForm.toggleName,
			togglePrice = document.forms.togglePriceForm.togglePrice,
            kindOfRenderMap = 'init',
			renderMap;
        configMap.tbodyElement = tbodyElement;
		$(dbBtnFilter).click(onClickBtnFilter);
        $(toggleName).click(onClickToggleSorting);
        $(togglePrice).click(onClickToggleSorting);
		renderMap = configMap.makeRenderMap(kindOfRenderMap);
		configMap.render(configMap.inventory, renderMap, configMap.tbodyElement);
    };
    return {
        init: init
    };
})();