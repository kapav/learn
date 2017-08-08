app.storage = (function() { //Модуль определяет модель
    var configMap = {
            filterFunc: app.util.filterFunc,
            makeRenderMapEntry: app.util.makeRenderMapEntry,
            makeFilterRenderMap: app.utilRenderMap.makeFilterRenderMap,
            makeSortingRenderMap: app.utilRenderMap.makeSortingRenderMap,
            makeInitRenderMap: app.utilRenderMap.makeInitRenderMap
		},
		stateMap = {
            renderMap: null,
            inventoryDb: {},
			filterDb: [],
            dbFilterUpperCase: null
        },
        completeAdd, makeProduct, inventory, completeFilter, makeFilter, filter, init;
		
    function Product() { //Конструктор товара
        Product.prototype.formatterUsdCur = new Intl.NumberFormat('en-US',
        {
            style: 'currency',
            currency: 'USD'
        });
    }
	
    completeAdd = function(productList) { //Обратный вызов для добавления товара
        var productMap = productList[0],
            product;
        product = makeProduct(productMap);
        if (!stateMap.dbFilterUpperCase || configMap.filterFunc(stateMap.dbFilterUpperCase, productMap)) {
            configMap.makeRenderMapEntry(stateMap.renderMap, productMap);
            $.gevent.publish('productAdd', product);
        }
    };
	
    makeProduct = function(productMap) { //Создаёт товар и сохраняет его
        var id = productMap.id,
            name = productMap.name,
            count = productMap.count,
            price = productMap.price,
            product;
        product = new Product();
        product.id = id;
        product.name = name;
        product.count = count;
        product.price = price;
        stateMap.inventoryDb[id] = product;
        return product;
    };
	
	inventory = (function () { //Объект хранилища товаров
	    var makeRenderMap, getDb, add, drop;
	    makeRenderMap = function (kindOfRenderMap, dbFilterUpperCase) {
	        var selfOwn = this;
	        switch (kindOfRenderMap) {
	            case 'filter':
	                if (dbFilterUpperCase.trim()) {
	                    stateMap.dbFilterUpperCase = dbFilterUpperCase;
	                    stateMap.renderMap = configMap.makeFilterRenderMap(stateMap.inventoryDb, stateMap.dbFilterUpperCase);
	                } else if (Object.keys(stateMap.inventoryDb).length > stateMap.renderMap.length) {
	                    stateMap.dbFilterUpperCase = null;
	                    stateMap.renderMap = configMap.makeInitRenderMap(stateMap.inventoryDb);
	                } else {
	                    stateMap.dbFilterUpperCase = null;
	                }
	                return stateMap.renderMap;
	                break;
	            case 'sorting':
	                return configMap.makeSortingRenderMap.call(selfOwn, stateMap.renderMap);
	                break;
	            case 'init':
	                stateMap.renderMap = configMap.makeInitRenderMap(stateMap.inventoryDb);
	                return stateMap.renderMap;
	                break;
	            default:
	                return null;
	                break;
	        }
	    };
	    getDb = function() { return stateMap.inventoryDb; };
	    add = function(productAttributes) {
	        var io = app.fakeData.mockIo;
	        io.on('productUpdate', completeAdd);
	        io.emit('addProduct',
	        {
	            name: productAttributes.name,
	            count: productAttributes.count,
	            price: productAttributes.price
	        });
	    };
	    drop = function(id) {
	        var getIndex = app.util.getIndex,
	            io = app.fakeData.mockIo;
	        delete stateMap.inventoryDb[id];
	        stateMap.renderMap.splice(getIndex(stateMap.renderMap, +id), 1);
	        io.emit('dropProduct',
	        {
	            id: id
	        });
	    };
	    return {
            makeRenderMap: makeRenderMap,
            getDb: getDb,
            add: add,
            drop: drop
        };
    })();
	
    completeFilter = function(filterList) { //Обратный вызов для добавления фильтра
        var filterMap = filterList[0],
            filterElem;
        filterElem = makeFilter(filterMap);
        $.gevent.publish('filterAdd', filterElem.filter);
    };
	
    makeFilter = function (filterMap) { //Создаёт фильтр и сохраняет его
        var filterValue = filterMap.filter,
            filterElem = {};
        filterElem.filter = filterValue;
        stateMap.filterDb.splice(0, 1, filterElem);
        return filterElem;
    };
	
    filter = (function () { //Объект хранилища фильтров (одно значение фильтра)
		var getFilter, add;
	    getFilter = function() { return stateMap.filterDb; };
	    add = function(filterAttributes) {
	        var mockFilter = app.fakeData.mockFilter;
	        mockFilter.on('filterUpdate', completeFilter);
	        mockFilter.emit('addFilter',
	        {
	            filter: filterAttributes.filter
	        });
	    };
		return {
			getFilter: getFilter,
			add: add
		};
	})();
	
    init = function() {
        var id, productList, product, i, filterList, filterElem;
        productList = app.fakeData.getProductList();
        for (id in productList) {
            if (productList.hasOwnProperty(id)) {
                product = productList[id];
                makeProduct({
                    id: product.id,
                    name: product.name,
                    count: product.count,
                    price: product.price
                });
            }
        }
        filterList = app.fakeData.getFilterList();
        for (i = 0; i < filterList.length; i++) {
            filterElem = filterList[i];
            makeFilter({
                filter: filterElem.filter
            });
        }
    };
	
    return {
        init: init,
        inventory: inventory,
		filter: filter
    };
})();
