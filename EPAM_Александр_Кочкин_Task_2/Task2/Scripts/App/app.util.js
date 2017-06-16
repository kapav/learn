app.util = (function() {
    var makeRenderMap, setConfigMap;
	makeRenderMap = function(renderMap, productEntry) {
		var id = productEntry.id,
			keyValue = productEntry.keyValue,
			mapEntry;
		mapEntry = new Object(); 
		mapEntry.id = id;
		mapEntry.keyValue = keyValue;
		renderMap.push(mapEntry);
		return mapEntry;
	};
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
    return {
		makeRenderMap: makeRenderMap,
		setConfigMap: setConfigMap
	};
})();