app.pageView = (function() {
    var configMap = {
            inventory: app.storage.inventory.getDb(),
            add: app.storage.inventory.add,
            drop: app.storage.inventory.drop,
            makeRenderMap: app.storage.inventory.makeRenderMap,
            render: app.utilBrowser.render,
            addRetrieve: app.modif.addRetrieve,
            tbodyClick: app.modif.tbodyClick
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
            dbBtnAdd = document.forms.filterAndAddForm.addProduct,
            changeBtnInModal = document.forms.changeForm.changeInModal,
            dropBtnInModal = document.forms.dropForm.dropInModal,
			inputs = {
				name: document.forms.changeForm.changeName,
				count: document.forms.changeForm.changeCount,
				price: document.forms.changeForm.changePrice
			},
            kindOfRenderMap = 'init',
			renderMap;
        configMap.tbodyElement = tbodyElement;
		$(dbBtnFilter).click(onClickBtnFilter);
        $(toggleName).click(onClickToggleSorting);
        $(togglePrice).click(onClickToggleSorting);
		renderMap = configMap.makeRenderMap(kindOfRenderMap);
		configMap.render(configMap.inventory, renderMap, configMap.tbodyElement);
		app.modif.init(configMap.inventory, configMap.add, configMap.drop, changeBtnInModal, dropBtnInModal, inputs);
		$(dbBtnAdd).click(configMap.addRetrieve);
        $(configMap.tbodyElement).click(configMap.tbodyClick);
    };
    return {
        init: init
    };
})();