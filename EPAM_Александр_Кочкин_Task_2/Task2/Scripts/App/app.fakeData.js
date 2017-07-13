app.fakeData = (function() {
    var stateMap = {
            productList: {
                1: { id: 1, name: 'Товар 1', count: 5, price: 12352.25 },
                2: { id: 2, name: 'Товар 2', count: 15, price: 12552.25 },
                3: { id: 3, name: 'Товар 3', count: 150, price: 12452.25 },
                4: { id: 4, name: 'Продукт 4', count: 350, price: 12502.25 }
            }
        },
        getProductList, fakeIdSerial, makeFakeId, mockIo;
    fakeIdSerial = 5;
    makeFakeId = function() {
        return fakeIdSerial++;
    };
    getProductList = function() {
        return stateMap.productList;
    };
    mockIo = (function() {
        var callbackMap = {},
            onIo, emitIo;
        onIo = function(msgType, callback) {
            callbackMap[msgType] = callback;
        };
        emitIo = function(msgType, data) {
            if (msgType === 'addProduct' && callbackMap.productUpdate) {
                setTimeout(function() {
                    callbackMap.productUpdate([{
                        id: makeFakeId(),
                        name: data.name,
                        count: data.count,
                        price: data.price
                    }]);
                }, 3000);
            }
        };
        return {
            on: onIo,
            emit: emitIo
        };
    })();
    return {
        getProductList: getProductList,
        mockIo: mockIo
    };
})();