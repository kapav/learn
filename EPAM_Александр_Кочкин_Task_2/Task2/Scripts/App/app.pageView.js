app.pageView = (function() {
    var configMap = {
            inventory: app.storage.inventory.getDb(),
			getRenderMap: app.storage.inventory.getRenderMap,
            render: app.utilBrowser.render
        },
        onClickBtnFilter, onClickToggleSorting, init;
	onClickBtnFilter = function() {
		var dbFilter = document.forms.filterAndAddForm.filterName,
			dbFilterUpperCase = dbFilter.value.toUpperCase(),
			kindOfRenderMap = 'filter',
			renderMap;
		renderMap = configMap.getRenderMap(kindOfRenderMap, dbFilterUpperCase);
		if (renderMap) {
			configMap.render(configMap.inventory, renderMap);
		}
	};
    onClickToggleSorting = function() {
		var selfOwn = this,
			kindOfRenderMap = 'sorting',
			renderMap;
		renderMap = configMap.getRenderMap.call(selfOwn, kindOfRenderMap);
		configMap.render(configMap.inventory, renderMap);
    };
    init = function() {
		var dbBtnFilter = document.forms.filterAndAddForm.filterProduct,
			toggleName = document.forms.toggleNameForm.toggleName,
			togglePrice = document.forms.togglePriceForm.togglePrice,
			kindOfRenderMap = 'init',
			renderMap;
		$(dbBtnFilter).click(onClickBtnFilter);
        $(toggleName).click(onClickToggleSorting);
        $(togglePrice).click(onClickToggleSorting);
		renderMap = configMap.getRenderMap(kindOfRenderMap);
		configMap.render(configMap.inventory, renderMap);
    };
    return {
        init: init
    };
})();