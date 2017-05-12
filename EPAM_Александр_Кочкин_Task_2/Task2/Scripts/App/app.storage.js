app.storage = (function() {
    var stateMap = {
            inventoryDb: []
        },
        makeProduct, inventory, init;
    makeProduct = function(productMap) {
        var product,
            id = productMap.id,
            name = productMap.name,
            count = productMap.count,
            price = productMap.price;
        product = new Object();
        product.id = id;
        product.name = name;
        product.count = count;
        product.price = price;
        stateMap.inventoryDb.push(product);
        return product;
    };
    inventory = {
        getDb: function() { return stateMap.inventoryDb; }
    };
    init = function() {
        var i, inventoryList, productMap;
        inventoryList = app.fakeData.getInventoryList();
        for (i = 0; i < inventoryList.length; i++) {
            productMap = inventoryList[i];
            makeProduct({
                id: productMap.id,
                name: productMap.name,
                count: productMap.count,
                price: productMap.price
            });
        }
    };
    return {
        init: init,
        inventory: inventory
    };
})();