app.pageView = (function() {
    var configMap = {
            inventory: app.storage.inventory.getDb(),
            getFilterRenderMap: app.utilRenderMap.getFilterRenderMap,
            getSortingRenderMap: app.utilRenderMap.getSortingRenderMap,
            getInitRenderMap: app.utilRenderMap.getInitRenderMap,
            render: app.utilBrowser.render
        },
        onClickBtnFilter, onClickToggleSorting, init;
	onClickBtnFilter = function() {
		var dbFilter = document.forms.filterAndAddForm.filterName,
			dbFilterUpperCase = dbFilter.value.toUpperCase();
        if (dbFilterUpperCase.trim()) {
            configMap.render(configMap.inventory, configMap.getFilterRenderMap(configMap.inventory, dbFilterUpperCase));
        }
	};
    onClickToggleSorting = function() {
		var selfOwn = this;
		configMap.render(configMap.inventory, configMap.getSortingRenderMap.call(selfOwn, configMap.inventory));
    };
    init = function() {
		var dbBtnFilter = document.forms.filterAndAddForm.filterProduct,
			toggleName = document.forms.toggleNameForm.toggleName,
			togglePrice = document.forms.togglePriceForm.togglePrice;
		$(dbBtnFilter).click(onClickBtnFilter);
        $(toggleName).click(onClickToggleSorting);
        $(togglePrice).click(onClickToggleSorting);
        configMap.render(configMap.inventory, configMap.getInitRenderMap(configMap.inventory));
    };
    return {
        init: init
    };
})();