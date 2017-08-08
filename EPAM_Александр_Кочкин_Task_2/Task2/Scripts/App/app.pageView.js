app.pageView = (function() { //Модуль отображает таблицу товаров
    var configMap = {
            inventory: app.storage.inventory.getDb(),
            addProduct: app.storage.inventory.add,
            dropProduct: app.storage.inventory.drop,
            makeRenderMap: app.storage.inventory.makeRenderMap,
			filterInventory: app.storage.filter.getFilter(),
			addFilter: app.storage.filter.add,
            render: app.utilBrowser.render,
            addRetrieve: app.modif.addRetrieve,
            tbodyClick: app.modif.tbodyClick
        },
		stateMap = {
			$container: null,
			$tbodyElement: null
		},
        onClickBtnFilter, onClickToggleSorting, init;
		
    onClickToggleSorting = function() { //Изменяет направление сортировки
		var selfOwn = this,
			kindOfRenderMap = 'sorting',
			renderMap;
		renderMap = configMap.makeRenderMap.call(selfOwn, kindOfRenderMap);
		configMap.render(configMap.inventory, renderMap, stateMap.$tbodyElement);
    };
	
    init = function(args) {
        var dbBtnFilter = document.forms.filterAndAddForm.filterProduct,
			toggleName = document.forms.toggleNameForm.toggleName,
            togglePrice = document.forms.togglePriceForm.togglePrice,
            dbBtnAdd = document.forms.filterAndAddForm.addProduct,
            kindOfRenderMap = 'init',
			params, renderMap;
        stateMap.$container = args.$container;
		stateMap.$tbodyElement = args.$tbodyElement;
		params = {
			$container: stateMap.$container,
			$tbodyElement: stateMap.$tbodyElement,
			inventory: configMap.inventory,
			filterInventory: configMap.filterInventory,
			addProduct: configMap.addProduct,
			dropProduct: configMap.dropProduct,
			addFilter: configMap.addFilter,
			makeRenderMap: configMap.makeRenderMap,
			changeBtnInModal: document.forms.changeForm.changeInModal,
			dropBtnInModal: document.forms.dropForm.dropInModal,
			dbBtnFilter: dbBtnFilter,
			inputs: {
				name: document.forms.changeForm.changeName,
				count: document.forms.changeForm.changeCount,
				price: document.forms.changeForm.changePrice,
				filter: document.forms.filterAndAddForm.filterName
			}
		};
		renderMap = configMap.makeRenderMap(kindOfRenderMap);
		configMap.render(configMap.inventory, renderMap, stateMap.$tbodyElement);
		app.modif.init(params);
        $(toggleName).click(onClickToggleSorting);
        $(togglePrice).click(onClickToggleSorting);
		$(dbBtnAdd).click(configMap.addRetrieve);
        $(stateMap.$tbodyElement).click(configMap.tbodyClick);
    };
	
    return {
        init: init
    };
})();