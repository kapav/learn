app.utilBrowser = (function() {
    var controlCharMaxNum = 32,
        firefoxFuncBtnNum = 0,
        isAcceptableNameChar = /[a-zA-Zа-яА-ЯёЁ0-9 _,;:\\\/\-\.\+\*\(\)!@#\$%&={}\[\]\"\'\?<>№]/,
        isAcceptableNameString = /^[a-zA-Zа-яА-ЯёЁ0-9 _,;:\\\/\-\.\+\*\(\)!@#\$%&={}\[\]\"\'\?<>№]{0,15}$/,
        showError, resetError, appendTableRow, render;
    showError = function(container, errorMessage) {
        var elem = container;
        $(elem).next().html(errorMessage);
        $(elem).next().removeClass('text-hide');
        $(elem).addClass('data-paint-red');
    };
    resetError = function(container) {
        var elem = container;
        $(elem).next().addClass('text-hide');
        $(elem).removeClass('data-paint-red');
    };
    appendTableRow = function(productEntry) {
        var templRow, trInnerBlock, trElem;
        $.ajax({
            url: 'HTML/row.html',
            async: false,
            success: function (data) {
                templRow = data;
            }
        });
        trInnerBlock = _.template(templRow)(productEntry);
        trElem = $(document.createElement("tr")).html(trInnerBlock)[0];
        $(this).append(trElem);
    };
    render = function (inventory, renderMap, tbodyElement) {
        var tableRows, i;
        tableRows = document.createDocumentFragment();
        $(tbodyElement).empty();
        for (i = 0; i < renderMap.length; i++) {
            appendTableRow.call(tableRows, inventory[renderMap[i].id]);
        }
        $(tbodyElement).append(tableRows);
    };
    return {
        controlCharMaxNum: controlCharMaxNum,
        firefoxFuncBtnNum: firefoxFuncBtnNum,
        isAcceptableNameChar: isAcceptableNameChar,
        isAcceptableNameString: isAcceptableNameString,
        showError: showError,
        resetError: resetError,
        appendTableRow: appendTableRow,
        render: render
	};
})();