app.modif = (function() {
    var configMap = {
            changeCheck: app.verif.changeCheck,
            primaryButtonStyle: 'btn-primary',
            warningButtonStyle: 'btn-warning'
        },
        stateMap = {
            inventory: null,
            add: null,
            drop: null,
            isUpdate: null,
            product: {},
            currentTr: null,
            dbBtnAdd: null,
            changeBtnInModal: null,
            dropBtnInModal: null,
            inputs: null
		},
		addRetrieve, editRetrieve, changePlace, dropRetrieve, dropPlace, tbodyClick, init;

	addRetrieve = function() { // Подготавливает добавление товара.
	    stateMap.product.name = '';
	    stateMap.product.count = '';
	    stateMap.product.price = '';
	    $(stateMap.changeBtnInModal)
			.removeClass(configMap.warningButtonStyle)
			.addClass(configMap.primaryButtonStyle)
			.html('Add');
	    stateMap.isUpdate = false;
	    stateMap.inputs.name.value = '';
	    stateMap.inputs.count.value = '';
	    stateMap.inputs.price.value = '';
	    $(stateMap.changeBtnInModal)
            .off('click', configMap.changeCheck).on('click', configMap.changeCheck)
            .off('click', changePlace).on('click', changePlace);
	}
	
	editRetrieve = function (productId) { // Извлекает из хранилища сведения о товаре.
	    stateMap.product.id = productId;
	    stateMap.product.name = stateMap.inventory[productId].name;
	    stateMap.product.count = stateMap.inventory[productId].count;
	    stateMap.product.price = stateMap.inventory[productId].price;
        $(stateMap.changeBtnInModal)
			.removeClass(configMap.primaryButtonStyle)
			.addClass(configMap.warningButtonStyle)
			.html('Update');
	    stateMap.isUpdate = true;
	    stateMap.inputs.name.value = stateMap.product.name;
	    stateMap.inputs.count.value = stateMap.product.count;
	    stateMap.inputs.price.value = stateMap.product.price;
	    $(stateMap.changeBtnInModal)
            .off('click', configMap.changeCheck).on('click', configMap.changeCheck)
            .off('click', changePlace).on('click', changePlace);
	}
	
	changePlace = function() { // Размещает сведения о товаре в хранилище.
	    if (stateMap.isUpdate) {
	        dropPlace();
	    }
    }

    dropRetrieve = function(productId) { // Извлекает удаляемый товар.
        stateMap.product.id = productId;
        $(stateMap.dropBtnInModal).off('click', dropPlace).on('click', dropPlace);
    }

    dropPlace = function() { // Удаляет из хранилища объект товара.
        stateMap.drop(stateMap.product.id);
        $(stateMap.currentTr).remove();
    }

    tbodyClick = function(event) { // Кнопки редактирования или удаления.
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
	
    init = function (inventory, add, drop, changeBtnInModal, dropBtnInModal, inputs) {
	    stateMap.inventory = inventory;
	    stateMap.add = add;
	    stateMap.drop = drop;
	    stateMap.changeBtnInModal = changeBtnInModal;
	    stateMap.dropBtnInModal = dropBtnInModal;
	    stateMap.inputs = inputs;
	    app.verif.init(stateMap.add, stateMap.product, stateMap.inputs);
    };
	
	return {
		init: init,
		addRetrieve: addRetrieve,
        tbodyClick: tbodyClick
	};
})();