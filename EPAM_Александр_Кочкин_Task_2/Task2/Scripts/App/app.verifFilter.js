app.verifFilter = (function () { //Модуль проверки при добавлении фильтра
    var configMap = {
        showError: app.utilBrowser.showError,
        resetError: app.utilBrowser.resetError,
        controlCharMaxNum: app.utilBrowser.controlCharMaxNum,
        firefoxFuncBtnNum: app.utilBrowser.firefoxFuncBtnNum,
        isAcceptableNameChar: app.utilBrowser.isAcceptableNameChar,
        isAcceptableNameString: app.utilBrowser.isAcceptableNameString
    },
		stateMap = {
		    add: null,
		    flag: null,
		    filter: null,
		    inputFilter: null
		},
		filterFormat, filterDeny, filterCheck, searchCheck, init;

    filterFormat = function (event) { //Проверка символов по одному
        var e = event || window.event,
            code = e.charCode || e.keyCode,
            filterSymbol;

        configMap.resetError(stateMap.inputFilter.parentElement.parentElement);
        if (code < configMap.controlCharMaxNum ||
			e.charCode === configMap.firefoxFuncBtnNum ||
			e.ctrlKey || e.altKey) {
            return;
        }

        filterSymbol = String.fromCharCode(code);

        if (!configMap.isAcceptableNameChar.test(filterSymbol)) {
            configMap.showError(stateMap.inputFilter.parentElement.parentElement, '* Введите буквы, цифры или спецсимволы');
        } else if (stateMap.inputFilter.value.length >= 15) {
            configMap.showError(stateMap.inputFilter.parentElement.parentElement, '* Фильтр должен быть от 1 до 15 символов');
        } else {
            return;
        }
        e.preventDefault();
    }

    filterDeny = function (event) { //Запрещение копирования недопустимых символов
        var clipboardData = event.originalEvent.clipboardData || window.clipboardData,
            pastedData;
        pastedData = clipboardData.getData('text');
        configMap.resetError(stateMap.inputFilter.parentElement.parentElement);
        if (!configMap.isAcceptableNameString.test(pastedData)) {
            configMap.showError(stateMap.inputFilter.parentElement.parentElement, '* Нельзя копировать из буфера обмена недопустимые символы');
        } else {
            return;
        }
        event.preventDefault();
    }

    filterCheck = function () { //Проверка фильтра имени товара для поиска
        var filterText = stateMap.inputFilter.value.trim();

        configMap.resetError(stateMap.inputFilter.parentElement.parentElement);
        stateMap.flag = false;

        if (!configMap.isAcceptableNameString.test(filterText)) {
            configMap.showError(stateMap.inputFilter.parentElement.parentElement, '* Должно быть от 1 до 15 букв, цифр или спецсимволов');
        } else {
            stateMap.filter = filterText;
            stateMap.inputFilter.value = filterText;
            stateMap.flag = true;
        }
    };

    searchCheck = function (event) { //Проверка корректности ввода
        filterCheck();
        if (stateMap.flag) {
            stateMap.add({
                filter: stateMap.filter
            });
        } else {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    init = function (args) {
        stateMap.add = args.add;
        stateMap.inputFilter = args.inputFilter;
        $(stateMap.inputFilter)
			.on({
			    keypress: filterFormat,
			    paste: filterDeny,
			    blur: filterCheck
			});
    };
    return {
        init: init,
        searchCheck: searchCheck
    };
})();