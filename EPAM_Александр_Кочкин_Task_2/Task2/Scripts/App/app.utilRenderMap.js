app.utilRenderMap = (function() {
    var configMap = {
            filterFunc: app.util.filterFunc,
            makeRenderMapEntry: app.util.makeRenderMapEntry
        },
        sortingName = false,
        sortingPrice = false,
        makeFilterRenderMap, makeSortingRenderMap, makeInitRenderMap;
    makeFilterRenderMap = function (inventory, dbFilterUpperCase) {
        var filterRenderMap = [],
            id, product;
        for (id in inventory) {
            if (inventory.hasOwnProperty(id)) {
				product = inventory[id];
				configMap.makeRenderMapEntry(filterRenderMap, {
				    id: product.id,
				    name: product.name,
				    price: product.price
				});
            }
        }
        return filterRenderMap.filter(configMap.filterFunc.bind(null, dbFilterUpperCase));
    };
    makeSortingRenderMap = function (sortingRenderMap) {
        var glyphiconToggle = this.firstElementChild,
            glyphiconTopClass = 'glyphicon glyphicon-triangle-top',
            glyphiconBottomClass = 'glyphicon glyphicon-triangle-bottom',
            sortingFeature,
            sortingFunc = function (prodEntryA, prodEntryB) {
                return prodEntryA.name.toUpperCase() < prodEntryB.name.toUpperCase() ? -1 : 1;
            };
        switch (this.id) {
            case 'toggleName':
                sortingName = !sortingName;
                sortingFeature = sortingName;
                break;
            case 'togglePrice':
                sortingFunc = function (prodA, prodB) {
                    return prodA.price < prodB.price ? -1 : 1;
                };
                sortingPrice = !sortingPrice;
                sortingFeature = sortingPrice;
            default:
                break;
        }
        sortingRenderMap.sort(sortingFunc);
        if (sortingFeature) {
            sortingRenderMap.reverse();
            glyphiconToggle.className = glyphiconBottomClass;
        } else {
            glyphiconToggle.className = glyphiconTopClass;
        }
		return sortingRenderMap;
    };
    makeInitRenderMap = function (inventory) {
        var initRenderMap = [],
            id, product;
        for (id in inventory) {
            if (inventory.hasOwnProperty(id)) {
                product = inventory[id];
                configMap.makeRenderMapEntry(initRenderMap, {
                    id: product.id,
					name: product.name,
					price: product.price
                });
            }
        }
        return initRenderMap;
    };
    return {
        makeFilterRenderMap: makeFilterRenderMap,
        makeSortingRenderMap: makeSortingRenderMap,
        makeInitRenderMap: makeInitRenderMap
    };
})();