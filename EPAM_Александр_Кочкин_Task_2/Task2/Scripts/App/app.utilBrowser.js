app.utilBrowser = (function () {
    var appendTableRow;
    appendTableRow = function(prod) {
        var templRow, trInnerBlock, trElem;
        prod.formatterUsdCur = new Intl.NumberFormat("en-US",
        {
            style: "currency",
            currency: "USD"
        });
        $.ajax({
            url: 'HTML/row.html',
            method: 'GET',
            dataType: 'html',
            async: false,
            success: function (data) {
                templRow = data;
            }
        });
        trInnerBlock = _.template(templRow)(prod);
        trElem = $(document.createElement("tr")).html(trInnerBlock)[0];
        trElem.id = "row" + prod.id;

        $(this).append(trElem);
    };
    return {
		appendTableRow: appendTableRow
	};
})();