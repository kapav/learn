app.utilBrowser = (function() {
    var appendTableRow;
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
    return {
		appendTableRow: appendTableRow
	};
})();