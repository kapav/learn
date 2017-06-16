app.utilRenderMap = (function() {
    var configMap = {
            makeRenderMap: app.util.makeRenderMap
        },
        sortingName = false,
        sortingPrice = false,
        getFilterRenderMap, getSortingRenderMap, getInitRenderMap;
    getFilterRenderMap = function (inventory, dbFilterUpperCase) {
        var filterRenderMap = [],
			keyValue = 'name',
			filterFunc, id, product;
        filterFunc = function (prodEntry, dbFilterUpperCase) {
            return prodEntry.keyValue.slice(0, dbFilterUpperCase.length).toUpperCase() === dbFilterUpperCase;
        };
        for (id in inventory) {
            if (inventory.hasOwnProperty(id)) {
                product = configMap.inventory[id];
                if (filterFunc(product, dbFilterUpperCase)) {
                    configMap.makeRenderMap(filterRenderMap, {
                        id: product.id,
                        keyValue: product[keyValue]
                    });
                }
            }
        }
        return filterRenderMap;
    };
    getSortingRenderMap = function (inventory) {
        var glyphiconToggle = this.firstElementChild,
            glyphiconTopClass = "glyphicon glyphicon-triangle-top",
            glyphiconBottomClass = "glyphicon glyphicon-triangle-bottom",
            sortingFeature,
            sortingFunc = function (prodEntryA, prodEntryB) {
                return prodEntryA.keyValue.toUpperCase() < prodEntryB.keyValue.toUpperCase() ? -1 : 1;
            },
			sortingRenderMap = [],
            keyValue = 'name',
            id, product;
        switch (this.id) {
            case "toggleName":
                sortingName = !sortingName;
                sortingFeature = sortingName;
                break;
            case "togglePrice":
                sortingFunc = function (prodA, prodB) {
                    return prodA.keyValue < prodB.keyValue ? -1 : 1;
                };
                keyValue = 'price';
                sortingPrice = !sortingPrice;
                sortingFeature = sortingPrice;
            default:
                break;
        }
        for (id in inventory) {
            if (inventory.hasOwnProperty(id)) {
                product = inventory[id];
                configMap.makeRenderMap(sortingRenderMap, {
                    id: product.id,
                    keyValue: product[keyValue]
                });
            }
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
			keyValue = 'name',
            id, product;
        for (id in inventory) {
            if (inventory.hasOwnProperty(id)) {
                product = inventory[id];
                configMap.makeRenderMap(initRenderMap, {
                    id: product.id,
                    keyValue: product[keyValue]
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