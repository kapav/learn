﻿app.fakeData = (function() {
    var getInventoryList;
    getInventoryList = function() {
        return [
            { id: 1, name: "Товар 1", count: 5, price: 12352.25 },
            { id: 2, name: "Товар 2", count: 15, price: 12552.25 },
            { id: 3, name: "Товар 3", count: 150, price: 12452.25 },
            { id: 4, name: "Продукт 4", count: 350, price: 12502.25 }
        ];
    };
    return { getInventoryList: getInventoryList };
})();