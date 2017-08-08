app.fakeData = (function() { //Модуль предоставляет подставные данные
    var stateMap = {
            productList: {
                1: { id: 1, name: 'Товар 1', count: 5, price: 12352.25 },
                2: { id: 2, name: 'Товар 2', count: 15, price: 12552.25 },
                3: { id: 3, name: 'Товар 3', count: 150, price: 12452.25 },
                4: { id: 4, name: 'Продукт 4', count: 350, price: 12502.25 }
            },
            filterList: [
                { filter: '' }
            ]
        },
        getProductList, fakeIdSerial, makeFakeId, mockIo, getFilterList, mockFilter;
    fakeIdSerial = 5;
	
    makeFakeId = function() { //Создание идентификатора товара
        return fakeIdSerial++;
    };
	
    getProductList = function() { //Получение списка товаров
        return stateMap.productList;
    };
	
    mockIo = (function() { //Объект-замыкание для добавления/удаления товара
        var callbackMap = {},
            onIo, emitIo;
        onIo = function(msgType, callback) {
            callbackMap[msgType] = callback;
        };
        emitIo = function(msgType, data) {
            var id, name, count, price;
            switch (msgType) {
                case 'addProduct':
                    if (callbackMap.productUpdate) {
						id = makeFakeId();
						name = data.name;
						count = data.count;
						price = data.price;
						stateMap.productList[id] = {
							id: id,
							name: name,
							count: count,
							price: price
						};
						callbackMap.productUpdate([{
							id: id,
							name: name,
							count: count,
							price: price
						}]);
                    }
                    break;
                case 'dropProduct':
                    setTimeout(function () {
                        delete stateMap.productList[data.id];
                    }, 3000);
                    break;
                default:
                    break;
            }
        };
        return {
            on: onIo,
            emit: emitIo
        };
    })();
	
	getFilterList = function() { //Получение списка фильтров из одного значения
		return stateMap.filterList;
	};
	
	mockFilter = (function() { //Объект-замыкание для добавления фильтра
		var callbackMap = {},
			onFilter, emitFilter;
        onFilter = function(msgType, callback) {
            callbackMap[msgType] = callback;
        };
		emitFilter = function(msgType, data) {
			var filterValue;
            if (msgType === 'addFilter' && callbackMap.filterUpdate) {
                filterValue = data.filter;
                stateMap.filterList.splice(0, 1, { filter: filterValue });
                callbackMap.filterUpdate([{
					filter: filterValue
				}]);
            }
		};
		return {
			on: onFilter,
			emit: emitFilter
		};
	})();
	
    return {
        getProductList: getProductList,
        mockIo: mockIo,
		getFilterList: getFilterList,
		mockFilter: mockFilter
    };
})();