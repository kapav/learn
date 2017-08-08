app.util = (function() { //Модуль вспомогательных методов
    var filterFunc, getIndex, makeRenderMapEntry;
	
    filterFunc = function (dbFilterUpperCase, productEntry) { //Фильтрация товара
        return productEntry.name.slice(0, dbFilterUpperCase.length).toUpperCase() === dbFilterUpperCase;
    };
	
    getIndex = function(renderMap, productId) { //Индекс данного элемента массива
        for (var i = 0; i < renderMap.length; i++) {
            if (renderMap[i].id === productId) { return i; }
        }
        return -1;
    };
	
    makeRenderMapEntry = function(renderMap, productEntry) { //Запись для карты отображения
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