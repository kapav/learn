app.storage = (function() {
    var configMap = {
            getFilterRenderMap: app.utilRenderMap.getFilterRenderMap,
            getSortingRenderMap: app.utilRenderMap.getSortingRenderMap,
            getInitRenderMap: app.utilRenderMap.getInitRenderMap,
		},
		stateMap = {
            idSerial: 5,
            inventoryDb: {},
			renderMap: null
        },
        makeId, makeProduct, dropProduct, inventory, init, getRenderMap;
    function Product() {
        Product.prototype.formatterUsdCur = new Intl.NumberFormat("en-US",
        {
            style: "currency",
            currency: "USD"
        });
    }
    makeId = function() {
        return stateMap.idSerial++;
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
    dropProduct = function(product) {
        if (!product) { return false; }

        return true;
    };
	getRenderMap = function(kindOfRenderMap, dbFilterUpperCase) {
		var selfOwn = this;
        switch (kindOfRenderMap) {
            case 'filter':
                stateMap.renderMap = configMap.getFilterRenderMap(stateMap.inventoryDb, stateMap.renderMap, dbFilterUpperCase);
				return stateMap.renderMap;
				break;
            case 'sorting':
                return configMap.getSortingRenderMap.call(selfOwn, stateMap.renderMap);
                break;
            case 'init':
                stateMap.renderMap = configMap.getInitRenderMap(stateMap.inventoryDb);
				return stateMap.renderMap;
                break;
            default:
                break;
        }
	};
    inventory = {
        getDb: function() { return stateMap.inventoryDb; },
		getRenderMap: getRenderMap
    };
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
