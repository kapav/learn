app.templ.mainHtml = (function () {
    return '<div class="container-fluid">\
        <div class="row">\
            <div class="col-lg-12">\
                <form name="changeForm">\
                    <!-- Modal Начало модального окна изменения-->\
                    <div id="changeModal" class="modal fade" role="dialog">\
                        <div class="modal-dialog modal-lg">\
        \
                            <!-- Modal content -->\
                            <div class="modal-content">\
                                <div class="modal-header">\
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>\
                                </div>\
                                <div class="modal-body">\
                                    <div class="form-group form-group-lg">\
                                        <div class="container-fluid">\
                                            <div class="row">\
                                                <div class="col-lg-12">\
                                                    <label for="changeName">Name:</label>\
                                                </div>\
                                            </div>\
                                        </div>\
                                        <div class="container-fluid">\
                                            <div class="row">\
                                                <div class="col-lg-6">\
                                                    <input type="text" class="form-control" id="changeName" name="changeName" placeholder="Имя товара" autofocus />\
                                                    <span class="error-msg text-hide">Текст</span>\
                                                </div>\
                                                <div class="col-lg-6">\
                                                    <p class="form-control-static">\
                                                        <span class="glyphicon glyphicon-asterisk"></span> Required field\
                                                    </p>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="form-group form-group-lg">\
                                        <div class="container-fluid">\
                                            <div class="row">\
                                                <div class="col-lg-12">\
                                                    <label for="changeCount">Count:</label>\
                                                </div>\
                                            </div>\
                                        </div>\
                                        <div class="container-fluid">\
                                            <div class="row">\
                                                <div class="col-lg-3">\
                                                    <input type="text" class="form-control" id="changeCount" name="changeCount" placeholder="Количество" />\
                                                    <span class="error-msg text-hide">Текст</span>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="form-group form-group-lg">\
                                        <div class="container-fluid">\
                                            <div class="row">\
                                                <div class="col-lg-12">\
                                                    <label for="changePrice">Price:</label>\
                                                </div>\
                                            </div>\
                                        </div>\
                                        <div class="container-fluid">\
                                            <div class="row">\
                                                <div class="col-lg-6">\
                                                    <input type="text" class="form-control" id="changePrice" name="changePrice" placeholder="Цена товара" />\
                                                    <span class="error-msg text-hide">Текст</span>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="modal-footer">\
                                    <div class="container-fluid">\
                                        <div class="row">\
                                            <div class="col-lg-4">\
                                                <button type="button" id="changeInModal" class="btn btn-primary btn-lg btn-block" data-dismiss="modal" data-is-update="0" data-prod-id-in-obj="0">Add</button>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
    \
                        </div>\
                    </div>\
                    <!-- Modal end -->\
                </form>\
                <form name="dropForm">\
                    <!-- Modal Начало модального окна удаления-->\
                    <div id="dropModal" class="modal fade" role="dialog">\
                        <div class="modal-dialog">\
    \
                            <!-- Modal content -->\
                            <div class="modal-content">\
                                <div class="modal-header">\
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>\
                                    <h4 class="modal-title">Are you sure?</h4>\
                                </div>\
                                <div class="modal-body">\
                                    <p>Are you sure you want to perform this action?</p>\
                                </div>\
                                <div class="modal-footer">\
                                    <div class="container-fluid">\
                                        <div class="row">\
                                            <div class="col-lg-offset-1 col-lg-5">\
                                                <!--Кнопка удаления в модальном-->\
                                                <button id="dropInModal" type="button" name="prodDropInModal" class="btn btn-danger btn-lg btn-block" data-dismiss="modal">Yes</button>\
                                            </div>\
                                            <div class="col-lg-5">\
                                                <button type="button" class="btn btn-primary btn-lg btn-block" data-dismiss="modal">No</button>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
     \
                        </div>\
                    </div>\
                    <!-- Modal end -->\
                </form>\
            </div>\
        </div>\
    </div>\
    <div class="container-fluid">\
        <div class="row row-above-table">\
            <form name="filterAndAddForm">\
                <div class="col-lg-5">\
                    <!--Значение для фильтрации-->\
                    <input type="text" class="form-control input-lg" name="filterName" placeholder="Фильтр по подстроке с именем товара" value="" />\
                </div>\
                <div class="col-lg-2">\
                    <!--Кнопка поиска-->\
                    <button type="button" class="btn btn-default btn-lg btn-block" id="filterProduct">Search</button>\
                </div>\
                <div class="col-lg-offset-2 col-lg-3">\
                    <!--Кнопка добавления-->\
                    <button type="button" class="btn btn-primary btn-lg btn-block" id="addProduct" data-toggle="modal" data-target="#changeModal" data-backdrop="static">Add New</button>\
                </div>\
            </form>\
            <span class="error-msg text-hide">Текст</span>\
        </div>\
    </div>\
    <div>\
        <table class="table table-bordered">\
            <thead>\
                <tr>\
                    <th class="col-lg-6 text-center">\
                        <form name="toggleNameForm">\
                            <div class="container-fluid">\
                                <div class="row">\
                                    <div class="col-lg-10 col-lg-push-1">\
                                        Name\
                                    </div>\
                                    <div class="col-lg-2">\
                                        <button id="toggleName" type="button" class="close">\
                                            <span class="glyphicon glyphicon-triangle-top"></span>\
                                        </button>\
                                    </div>\
                                </div>\
                            </div>\
                        </form>\
                    </th>\
                    <th class="col-lg-2 text-center">\
                        <form name="togglePriceForm">\
                            <div class="container-fluid">\
                                <div class="row">\
                                    <div class="col-lg-10 col-lg-push-1">\
                                        Price\
                                    </div>\
                                    <div class="col-lg-2">\
                                        <button id="togglePrice" type="button" class="close">\
                                            <span class="glyphicon glyphicon-triangle-top"></span>\
                                        </button>\
                                    </div>\
                                </div>\
                            </div>\
                        </form>\
                    </th>\
                    <th class="col-lg-4 text-center">\
                        <div class="container-fluid">\
                            <div class="row">\
                                <div class="col-lg-12">\
                                    Actions\
                                </div>\
                            </div>\
                        </div>\
                    </th>\
                </tr>\
            </thead>\
            <tbody id="tbodyElement"></tbody>\
        </table>\
    </div>';
})();