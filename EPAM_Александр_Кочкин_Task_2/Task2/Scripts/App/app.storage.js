app.storage = (function() {
    var stateMap = {
            idSerial: 5,
            inventoryDb: {}
        },
        makeId, makeProduct, dropProduct, inventory, init;
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
    inventory = {
        getDb: function() { return stateMap.inventoryDb; }
    };
    init = function() {
        var id, inventoryList, product;
        inventoryList = app.fakeData.getInventoryList();
        for (id in inventoryList) {
            if (inventoryList.hasOwnProperty(id)) {
                product = inventoryList[id];
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
