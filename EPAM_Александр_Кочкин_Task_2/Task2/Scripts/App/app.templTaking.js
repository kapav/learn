app.templTaking = (function() { //Модуль для асинхронного обращения к файлу
    var mockTake;
	
    mockTake = (function () { //Объект-замыкание для получения вёрстки
        var callbackMap = {},
            onObtain, emitObtain;
        onObtain = function(msgType, callback) {
            callbackMap[msgType] = callback;
        };
        emitObtain = function(msgType, data) {
            if (msgType === 'obtainTempl' && callbackMap.templAchieve) {
                callbackMap.templAchieve();
            }
        };
        return {
            on: onObtain,
            emit: emitObtain
        };
    })();
	
    return {
        mockTake: mockTake
    };
})();