app.utilBrowser = (function() {
    var appendTableRow, render;
    appendTableRow = function(inventory, productEntry) {
        var templRow, trInnerBlock, trElem;
        $.ajax({
            url: 'HTML/row.html',
            async: false,
            success: function (data) {
                templRow = data;
            }
        });
        trInnerBlock = _.template(templRow)(inventory[productEntry.id]);
        trElem = $(document.createElement("tr")).html(trInnerBlock)[0];
        trElem.id = "row" + productEntry.id;

        $(this).append(trElem);
    };
    render = function (inventory, renderMap) {
        var tbodyElement, tableRows, i;
        tbodyElement = $('#tbodyElement')[0];
        tableRows = document.createDocumentFragment();
        $(tbodyElement).empty();
        for (i = 0; i < renderMap.length; i++) {
            appendTableRow.call(tableRows, inventory, renderMap[i]);
        }
        $(tbodyElement).append(tableRows);
    };
    return {
        appendTableRow: appendTableRow,
        render: render
	};
})();