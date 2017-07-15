app.storage = (function() {
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
            product: null,
            dbFilterUpperCase: null
        },
        completeAdd, makeProduct, inventory, init;
    function Product() {
        Product.prototype.formatterUsdCur = new Intl.NumberFormat("en-US",
        {
            style: "currency",
            currency: "USD"
        });
    }
    completeAdd = function(productList) {
        var productMap = productList[0],
            product;
        product = makeProduct(productMap);
        if (!stateMap.dbFilterUpperCase || configMap.filterFunc(stateMap.dbFilterUpperCase, productMap)) {
            configMap.makeRenderMapEntry(stateMap.renderMap, productMap);
            $.gevent.publish('appAdd', product);
        }
    };
    makeProduct = function(productMap) {
        var product,
            id = productMap.id,
            name = productMap.name,
            count = productMap.count,
            price = productMap.price;
        product = new Product();
        product.id = id;
        product.name = name;
        product.count = count;
        product.price = price;
        stateMap.inventoryDb[id] = product;
        return product;
    };
	inventory = (function () {
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
	    getDb = function () { return stateMap.inventoryDb; };
	    add = function(name, count, price) {
	        var io = app.fakeData.mockIo;
	        io.on('productUpdate', completeAdd);
	        io.emit('addProduct',
	        {
	            name: name,
	            count: count,
	            price: price
	        });
	    };
	    drop = function(id) {
	        var getIndex = app.util.getIndex,
	            io = app.fakeData.mockIo;
	        delete stateMap.inventoryDb[id];
	        stateMap.renderMap.splice(getIndex(stateMap.renderMap, id), 1);
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
    init = function() {
        var id, productList, product;
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
    };
    return {
        init: init,
        inventory: inventory
    };
})();
