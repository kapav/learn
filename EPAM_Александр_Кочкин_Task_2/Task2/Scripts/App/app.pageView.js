app.pageView = (function() {
    var inventory, render, init;
    inventory = app.storage.inventory.getDb();
    render = function(inventory) {
        var tbodyElement, tableRows;
        tbodyElement = $('#tbodyElement')[0];
        tableRows = document.createDocumentFragment();
        $(tbodyElement).empty();
        inventory.forEach(app.render.appendTableRow, tableRows);
        $(tbodyElement).append(tableRows);
    };
    init = function() {
        render(inventory);
    };
    return { init: init };
})();