app.utilBrowser = (function() { //Модуль вспомогательных браузерных методов
    var controlCharMaxNum = 32,
        firefoxFuncBtnNum = 0,
        isAcceptableNameChar = /[a-zA-Zа-яА-ЯёЁ0-9 _,;:\\\/\-\.\+\*\(\)!@#\$%&={}\[\]\"\'\?<>№]/,
        isAcceptableNameString = /^[a-zA-Zа-яА-ЯёЁ0-9 _,;:\\\/\-\.\+\*\(\)!@#\$%&={}\[\]\"\'\?<>№]{0,15}$/,
        showError, resetError, appendTableRow, render;
		
    showError = function(container, errorMessage) { //Показывает ошибку текстового поля
        var elem = container;
        $(elem).next().html(errorMessage);
		$(elem).next().removeClass('conceal-text');
		$(elem).addClass('data-paint-red');
        //$(elem).next().removeClass('text-hide');
        //$(elem).addClass('data-paint-red');
    };
	
    resetError = function(container) { //Сброс ошибки текстового поля
        var elem = container;
		$(elem).next().addClass('conceal-text');
        //$(elem).next().addClass('text-hide');
        $(elem).removeClass('data-paint-red');
    };
	
    appendTableRow = function(productEntry) { //Добавляет строку таблицы в вёрстку
        var completeRow, templReceiveRow, templRow, trInnerBlock, trElem;
		/*completeRow = function() {
			$.ajax({
				url: 'HTML/row.html',
				async: true,
				error: function (xhr) {
					console.log('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
				},
				success: function (data) {
					templRow = data;
					console.log('completeRow выполнен success');
				}
			});
		};
		templReceiveRow = (function() {
			var obtain;
			obtain = function () {
				var take = app.templTaking.mockTake;
				take.on('templAchieve', completeRow);
				take.emit('obtainTempl');
			};
			return {
				obtain: obtain
			};
		})();
		templReceiveRow.obtain();
		setTimeout(function () {
			console.log('завершено ожидание completeRow');
		}, 100);*/
        $.ajax({
            url: 'HTML/row.html',
            async: false,
            success: function(data) {
                templRow = data;
            }
        });
        trInnerBlock = _.template(templRow)(productEntry);
        trElem = $(document.createElement("tr")).html(trInnerBlock)[0];
        $(this).append(trElem);
    };
	
    render = function (inventory, renderMap, tbodyElement) { //Отображает таблицу
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