app.util = function() {
    var setConfigMap;
    setConfigMap = function(argMap) {
        var inputMap = argMap.inputMap,
            settableMap = argMap.settableMap,
            configMap = argMap.configMap,
            keyName;
        for (keyName in inputMap) {
            if (inputMap.hasOwnProperty(keyName)) {
                if (settableMap.hasOwnProperty(keyName)) {
                    configMap[keyName] = inputMap[keyName];
                }
            }
        }
    };
    return { setConfigMap: setConfigMap };
};