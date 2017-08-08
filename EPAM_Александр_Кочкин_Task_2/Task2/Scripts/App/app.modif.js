app.modif = (function() { //Модуль вносит изменения в хранимые товары и фильтры
    var configMap = {
			resetError: app.utilBrowser.resetError,
            changeCheck: app.verif.changeCheck,
			searchCheck: app.verifFilter.searchCheck,
			render: app.utilBrowser.render,
            primaryButtonStyle: 'btn-primary',
            warningButtonStyle: 'btn-warning'
        },
        stateMap = {
			$container: null,
			$tbodyElement: null,
            inventory: null,
			filter: null,
            addProduct: null,
            dropProduct: null,
			addFilter: null,
			makeRenderMap: null,
            isUpdate: null,
            product: {},
            currentTr: null,
            dbBtnAdd: null,
            changeBtnInModal: null,
            dropBtnInModal: null,
			dbBtnFilter: null,
            inputs: null
		},
		resetErrors, addRetrieve, editRetrieve, dropRetrieve, dropPlace, tbodyClick, renderFilteredProducts, onProductAdd, onFilterAdd, init;
		
	resetErrors = function() { //Сброс ошибок текстовых полей
	    configMap.resetError(stateMap.inputs.name);
	    configMap.resetError(stateMap.inputs.count);
	    configMap.resetError(stateMap.inputs.price);
	};

	addRetrieve = function() { //Подготавливает добавление товара
	    stateMap.product.name = '';
	    stateMap.product.count = '';
	    stateMap.product.price = '';
	    $(stateMap.changeBtnInModal)
			.removeClass(configMap.warningButtonStyle)
			.addClass(configMap.primaryButtonStyle)
			.html('Add');
	    stateMap.isUpdate = false;
	    resetErrors();
	    stateMap.inputs.name.value = '';
	    stateMap.inputs.count.value = '';
	    stateMap.inputs.price.value = '';
	}
	
	editRetrieve = function (productId) { //Извлекает из хранилища сведения о товаре
	    stateMap.product.id = productId;
	    stateMap.product.name = stateMap.inventory[productId].name;
	    stateMap.product.count = stateMap.inventory[productId].count;
	    stateMap.product.price = stateMap.inventory[productId].price;
        $(stateMap.changeBtnInModal)
			.removeClass(configMap.primaryButtonStyle)
			.addClass(configMap.warningButtonStyle)
			.html('Update');
	    stateMap.isUpdate = true;
	    resetErrors();
	    stateMap.inputs.name.value = stateMap.product.name;
	    stateMap.inputs.count.value = stateMap.product.count;
	    stateMap.inputs.price.value = stateMap.product.price;
	}
	
    dropRetrieve = function(productId) { //Извлекает удаляемый товар
        stateMap.product.id = productId;
    }

    dropPlace = function() { //Удаляет из хранилища и вёрстки объект товара
        stateMap.dropProduct(stateMap.product.id);
        $(stateMap.currentTr).remove();
    }
	
    tbodyClick = function(event) { //Кнопки редактирования или удаления
        var buttonId = event.target.id,
            productId = buttonId.substring(11);

        stateMap.currentTr = $(event.target).closest('tr');
        switch (buttonId.substring(0, 11)) {
            case 'editProduct':
                editRetrieve(productId);
                break;
            case 'dropProduct':
                dropRetrieve(productId);
                break;
            default:
                break;
        }
    }
	
	renderFilteredProducts = function() { //Отображает товары с применённым фильтром
		var dbFilterUpperCase = stateMap.filter.toUpperCase(),
			kindOfRenderMap = 'filter',
			renderMap;
		renderMap = stateMap.makeRenderMap(kindOfRenderMap, dbFilterUpperCase);
		if (renderMap) {
			configMap.render(stateMap.inventory, renderMap, stateMap.$tbodyElement);
		}
	};
	
	onProductAdd = function() { //Удаляет старый товар при редактировании
		if (stateMap.isUpdate) {
			stateMap.dropProduct(stateMap.product.id);
			$(stateMap.currentTr).remove();
		}
	};

	onFilterAdd = function(event, addFilter) { //Обрабатывает добавление фильтра
		stateMap.filter = addFilter;
	};
	
    init = function(args) {
		var productParams, filterParams;
		stateMap.$container = args.$container;
		stateMap.$tbodyElement = args.$tbodyElement;
	    stateMap.inventory = args.inventory;
		stateMap.filter = args.filterInventory[0].filter;
	    stateMap.addProduct = args.addProduct;
	    stateMap.dropProduct = args.dropProduct;
		stateMap.addFilter = args.addFilter;
		stateMap.makeRenderMap = args.makeRenderMap;
	    stateMap.changeBtnInModal = args.changeBtnInModal;
	    stateMap.dropBtnInModal = args.dropBtnInModal;
		stateMap.dbBtnFilter = args.dbBtnFilter;
	    stateMap.inputs = args.inputs;
		stateMap.inputs.filter.value = stateMap.filter;
		productParams = {
			add: stateMap.addProduct,
			product: stateMap.product,
			inputs: {
				name: stateMap.inputs.name,
				count: stateMap.inputs.count,
				price: stateMap.inputs.price
			}
		};
	    app.verif.init(productParams);
		filterParams = {
			add: stateMap.addFilter,
			inputFilter: stateMap.inputs.filter 
		};
		app.verifFilter.init(filterParams);
		$(stateMap.changeBtnInModal).on('click', configMap.changeCheck);
		$(stateMap.dropBtnInModal).on('click', dropPlace);
		$(stateMap.dbBtnFilter)
			.on('click', configMap.searchCheck)
			.on('click', renderFilteredProducts);
		$.gevent.subscribe(stateMap.$container, 'productAdd', onProductAdd);
		$.gevent.subscribe(stateMap.$container, 'filterAdd', onFilterAdd);
    };
	
	return {
		init: init,
		addRetrieve: addRetrieve,
        tbodyClick: tbodyClick
	};
})();