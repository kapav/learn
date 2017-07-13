app.util = (function() {
    var filterFunc, makeRenderMapEntry, setConfigMap;
    filterFunc = function (dbFilterUpperCase, productEntry) {
        return productEntry.name.slice(0, dbFilterUpperCase.length).toUpperCase() === dbFilterUpperCase;
    };
	makeRenderMapEntry = function(renderMap, productEntry) {
		var id = productEntry.id,
			name = productEntry.name,
			price = productEntry.price,
			renderMapEntry;
		renderMapEntry = new Object(); 
		renderMapEntry.id = id;
		renderMapEntry.name = name;
		renderMapEntry.price = price;
		renderMap.push(renderMapEntry);
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
        filterFunc: filterFunc,
		makeRenderMapEntry: makeRenderMapEntry,
		setConfigMap: setConfigMap
	};
})();