app.utilRenderMap = (function() {
    var configMap = {
            makeRenderMap: app.util.makeRenderMap
        },
        sortingName = false,
        sortingPrice = false,
        getFilterRenderMapHelper, getFilterRenderMap, getSortingRenderMap, getInitRenderMap;
    getFilterRenderMapHelper = function (inventory, dbFilterUpperCase) {
        var filterRenderMap = [],
            filterFunc, id, product;
        filterFunc = function (prodEntry) {
            return prodEntry.name.slice(0, dbFilterUpperCase.length).toUpperCase() === dbFilterUpperCase;
        };
        for (id in inventory) {
            if (inventory.hasOwnProperty(id)) {
				product = inventory[id];
				configMap.makeRenderMap(filterRenderMap, {
				    id: product.id,
				    name: product.name,
				    price: product.price
				});
            }
        }
        return filterRenderMap.filter(filterFunc);
    };
	getFilterRenderMap = function (inventory, renderMap, dbFilterUpperCase) {
		if (dbFilterUpperCase.trim()) {
			return getFilterRenderMapHelper(inventory, dbFilterUpperCase);
		} else if (Object.keys(inventory).length > renderMap.length) {
		    return getInitRenderMap(inventory);
        }
		return renderMap;
	};
    getSortingRenderMap = function (sortingRenderMap) {
        var glyphiconToggle = this.firstElementChild,
            glyphiconTopClass = "glyphicon glyphicon-triangle-top",
            glyphiconBottomClass = "glyphicon glyphicon-triangle-bottom",
            sortingFeature,
            sortingFunc = function (prodEntryA, prodEntryB) {
                return prodEntryA.name.toUpperCase() < prodEntryB.name.toUpperCase() ? -1 : 1;
            };
        switch (this.id) {
            case "toggleName":
                sortingName = !sortingName;
                sortingFeature = sortingName;
                break;
            case "togglePrice":
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
    getInitRenderMap = function (inventory) {
        var initRenderMap = [],
            id, product;
        for (id in inventory) {
            if (inventory.hasOwnProperty(id)) {
                product = inventory[id];
                configMap.makeRenderMap(initRenderMap, {
                    id: product.id,
					name: product.name,
					price: product.price
                });
            }
        }
        return initRenderMap;
    };
    return {
        getFilterRenderMap: getFilterRenderMap,
        getSortingRenderMap: getSortingRenderMap,
        getInitRenderMap: getInitRenderMap
    };
})();