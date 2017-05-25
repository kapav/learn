app.utilBrowser = (function () {
    var appendTableRow;
    appendTableRow = function(prod) {
        var formatterUsdCur, templRow, trInnerBlock, trElem;
        formatterUsdCur = new Intl.NumberFormat("en-US",
        {
            style: "currency",
            currency: "USD"
        });
        templRow = app.templ.row;
        trInnerBlock = _.template(templRow)({
            
        });
        trElem = $(document.createElement("tr")).html(trInnerBlock)[0];
        trElem.id = "row" + prod.id;

        trElem.querySelector("a.prodName").innerHTML = prod.name;
        trElem.querySelector("span.prodCount").innerHTML = prod.count;
        trElem.querySelector("div.prodPrice").innerHTML = formatterUsdCur.format(prod.price);
        trElem.querySelector("button.editForModal").id = "editProduct" + prod.id;
        trElem.querySelector("button.dropForModal").id = "dropProduct" + prod.id;

        $(this).append(trElem);
    };
    return {
		appendTableRow: appendTableRow
	};
})();