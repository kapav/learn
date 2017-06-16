app.pageView = (function() {
    var configMap = {
            inventory: app.storage.inventory.getDb(),
			makeRenderMap: app.util.makeRenderMap
        },
        glyphiconTopClass = "glyphicon glyphicon-triangle-top",
        glyphiconBottomClass = "glyphicon glyphicon-triangle-bottom",
        sortingName = false,
        sortingPrice = false,
        getFilterRenderMap, getSortingRenderMap, getInitRenderMap, render, onClickBtnFilter, onClickToggleSorting, init;
	getFilterRenderMap = function(dbFilterUpperCase) {
		var filterRenderMap = [],
			keyValue = 'name',
			filterFunc, id, product;
		filterFunc = function(prodEntry, dbFilterUc) {
			return prodEntry.keyValue.slice(0, dbFilterUc.length).toUpperCase() === dbFilterUc;
		};
        for (id in configMap.inventory) {
            if (configMap.inventory.hasOwnProperty(id)) {
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
    getSortingRenderMap = function() {
        var glyphiconToggle = this.firstElementChild,
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
                sortingFunc = function(prodA, prodB) {
                    return prodA.keyValue < prodB.keyValue ? -1 : 1;
                };
                keyValue = 'price';
                sortingPrice = !sortingPrice;
                sortingFeature = sortingPrice;
            default:
                break;
        }
        for (id in configMap.inventory) {
            if (configMap.inventory.hasOwnProperty(id)) {
                product = configMap.inventory[id];
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
	getInitRenderMap = function() {
		var initRenderMap = [],
			keyValue = 'name',
            id, product;
        for (id in configMap.inventory) {
            if (configMap.inventory.hasOwnProperty(id)) {
                product = configMap.inventory[id];
                configMap.makeRenderMap(initRenderMap, {
                    id: product.id,
                    keyValue: product[keyValue]
                });
            }
        }
		return initRenderMap;
	};
    render = function (inventory, renderMap) {
        var tbodyElement, tableRows, i;
        tbodyElement = $('#tbodyElement')[0];
        tableRows = document.createDocumentFragment();
        $(tbodyElement).empty();
		for (i = 0; i < renderMap.length; i++) {
			app.utilBrowser.appendTableRow.call(tableRows, configMap.inventory, renderMap[i]);
		}
        $(tbodyElement).append(tableRows);
    };
	onClickBtnFilter = function() {
		var dbFilter = document.forms.filterAndAddForm.filterName,
			dbFilterUpperCase = dbFilter.value.toUpperCase();
        if (dbFilterUpperCase.trim()) {
			render(configMap.inventory, getFilterRenderMap(dbFilterUpperCase));
        }
	};
    onClickToggleSorting = function() {
		var selfOwn = this;
		render(configMap.inventory, getSortingRenderMap.call(selfOwn));
    };
    init = function() {
		var dbBtnFilter = document.forms.filterAndAddForm.filterProduct,
			toggleName = document.forms.toggleNameForm.toggleName,
			togglePrice = document.forms.togglePriceForm.togglePrice;
		$(dbBtnFilter).click(onClickBtnFilter);
        $(toggleName).click(onClickToggleSorting);
        $(togglePrice).click(onClickToggleSorting);
		render(configMap.inventory, getInitRenderMap());
    };
    return {
        init: init
    };
})();