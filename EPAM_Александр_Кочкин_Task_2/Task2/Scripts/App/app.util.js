app.util = (function() {
    var filterFunc, getIndex, makeRenderMapEntry, setConfigMap;
    filterFunc = function (dbFilterUpperCase, productEntry) {
        return productEntry.name.slice(0, dbFilterUpperCase.length).toUpperCase() === dbFilterUpperCase;
    };
    getIndex = function(renderMap, productId) {
        for (var i = 0; i < renderMap.length; i++) {
            if (renderMap[i].id === productId) { return i; }
        }
        return -1;
    }
    makeRenderMapEntry = function(renderMap, productEntry) {
		var id = productEntry.id,
			name = productEntry.name,
			price = productEntry.price,
			renderMapEntry;
		renderMapEntry = {}; 
		renderMapEntry.id = id;
		renderMapEntry.name = name;
		renderMapEntry.price = price;
		renderMap.push(renderMapEntry);
	};
    return {
        filterFunc: filterFunc,
        getIndex: getIndex,
		makeRenderMapEntry: makeRenderMapEntry
	};
})();