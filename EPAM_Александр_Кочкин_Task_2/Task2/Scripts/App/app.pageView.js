app.pageView = (function() {
    var configMap = {
            inventory: app.storage.inventory.getDb()
        },
        glyphiconTopClass = "glyphicon glyphicon-triangle-top",
        glyphiconBottomClass = "glyphicon glyphicon-triangle-bottom",
        sortingName = false,
        sortingPrice = false,
        getFilteredInventory, configSorting, render, onClickToggleSorting, init;
	getFilteredInventory = function(dbFilterUpperCase) {
		var arrFilter;
		arrFilter = function(arr, dbFilterUc) {
			var result = [],
				func, i, val;
			func = function(arrVal, dbFilterUc) {
				return arrVal.name.slice(0, dbFilterUc.length).toUpperCase() === dbFilterUc;
			};
			for (i = 0; i < arr.length; i++) {
				val = arr[i];
				if (func(val, dbFilterUc)) {
					result.push(val);
				}
			}
			return result;
		}
		return arrFilter(configMap.inventory, dbFilterUpperCase);
	};
    configSorting = function() {
        var glyphiconToggle = this.firstElementChild,
            sortingFeature,
            sortingFunc = function(prodA, prodB) {
                return prodA.name.toUpperCase() < prodB.name.toUpperCase() ? -1 : 1;
            };
        switch (this.id) {
            case "toggleName":
                sortingName = !sortingName;
                sortingFeature = sortingName;
                break;
            case "togglePrice":
                sortingFunc = function(prodA, prodB) {
                    return prodA.price < prodB.price ? -1 : 1;
                };
                sortingPrice = !sortingPrice;
                sortingFeature = sortingPrice;
            default:
                break;
        }
        configMap.inventory.sort(sortingFunc);
        if (sortingFeature) {
            configMap.inventory.reverse();
            glyphiconToggle.className = glyphiconBottomClass;
        } else {
            glyphiconToggle.className = glyphiconTopClass;
        }
    };
    render = function (inventory) {
        var tbodyElement, tableRows;
        tbodyElement = $('#tbodyElement')[0];
        tableRows = document.createDocumentFragment();
        $(tbodyElement).empty();
        inventory.forEach(app.utilBrowser.appendTableRow, tableRows);
        $(tbodyElement).append(tableRows);
    };
	onClickBtnFilter = function() {
		var filteredInventory = [],
			dbFilter = document.forms.filterAndAddForm.filterName,
			dbFilterUpperCase = dbFilter.value.toUpperCase();
        if (dbFilterUpperCase.trim()) {
            filteredInventory = getFilteredInventory(dbFilterUpperCase);
			render(filteredInventory);
        }
	};
    onClickToggleSorting = function() {
		var selfOwn = this;
        configSorting.call(selfOwn);
        render(configMap.inventory);
    };
    init = function() {
		var dbBtnFilter = document.forms.filterAndAddForm.filterProduct,
			toggleName = document.forms.toggleNameForm.toggleName,
			togglePrice = document.forms.togglePriceForm.togglePrice;
		$(dbBtnFilter).click(onClickBtnFilter);
        $(toggleName).click(onClickToggleSorting);
        $(togglePrice).click(onClickToggleSorting);
        render(configMap.inventory);
    };
    return {
        init: init
    };
})();