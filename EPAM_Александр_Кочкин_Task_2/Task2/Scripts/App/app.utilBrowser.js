app.utilBrowser = (function() {
    var appendTableRow, render;
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
        appendTableRow: appendTableRow,
        render: render
	};
})();