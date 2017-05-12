app.templ.row = (function() {
    return '<td>\
            <div class="container-fluid">\
                <div class="row">\
                    <div class="col-lg-10">\
                        <!--Имя товара-->\
                        <a href="#" name="prodName" class="prodName">Товар 1</a>\
                    </div>\
                    <div class="col-lg-2 text-right">\
                        <!--Количество товара-->\
                        <span name="prodCount" class="badge prodCount">5</span>\
                    </div>\
                </div>\
            </div>\
        </td>\
        <td class="text-center">\
            <div class="container-fluid">\
                <div class="row">\
                    <!--Отображаемая цена, взятая из хранилища.-->\
                    <div name="prodPrice" class="col-lg-12 prodPrice">\
                        $12,35\
                    </div>\
                </div>\
            </div>\
        </td>\
        <td>\
            <div class="container-fluid">\
                <div class="row">\
                    <!--Редактирование товара-->\
                    <div class="col-lg-6">\
                        <button type="button" name="#editForModal" class="btn btn-warning btn-lg btn-block editForModal" data-toggle="modal" data-backdrop="static" data-target="#changeModal">Edit</button>\
                    </div>\
                    <!--Удаление товара-->\
                    <div class="col-lg-6">\
                        <button type="button" name="#dropForModal" class="btn btn-danger btn-lg btn-block dropForModal" data-toggle="modal" data-backdrop="static" data-target="#dropModal">Delete</button>\
                    </div>\
                </div>\
            </div>\
        </td>';
});