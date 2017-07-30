app.verif = (function() {
    var configMap = {
            showError: app.utilBrowser.showError,
            resetError: app.utilBrowser.resetError,
            controlCharMaxNum: app.utilBrowser.controlCharMaxNum,
            firefoxFuncBtnNum: app.utilBrowser.firefoxFuncBtnNum,
            isAcceptableNameChar: app.utilBrowser.isAcceptableNameChar,
            isAcceptableNameString: app.utilBrowser.isAcceptableNameString,
            isAcceptableCountChar: /[\d]/,
            isAcceptableCountString: /^[\d]{0,15}$/,
            isAcceptablePriceChar: /[\d\.]/,
            isAcceptablePriceString: /^[\d\.]{0,15}$/,
            formatterUsdCur: new Intl.NumberFormat('en-US',
            {
                style: 'currency',
                currency: "USD"
            })
        },
        stateMap = {
            add: null,
            propriety: null,
            flag: {},
            product: null,
            inputs: null
        },
        nameFormat, nameCheck, nameDeny, countFormat, countCheck, countDeny, priceRegain, priceFormat, priceCheck, priceDeny, proprietyControl, changeCheck, init;

    nameFormat = function(event) { // Проверка символов по одному.
        var e = event || window.event,
            code = e.charCode || e.keyCode,
            nameSymbol;

        configMap.resetError(stateMap.inputs.name);
        if (code < configMap.controlCharMaxNum ||
            e.charCode === configMap.firefoxFuncBtnNum ||
            e.ctrlKey ||
            e.altKey) {
            return;
        }
        nameSymbol = String.fromCharCode(code);

        if (!configMap.isAcceptableNameChar.test(nameSymbol)) {
            configMap.showError(stateMap.inputs.name, '* Введите буквы, цифры или спецсимволы');
        } else if (stateMap.inputs.name.value.length >= 15) {
            configMap.showError(stateMap.inputs.name, '* Имя должно быть от 1 до 15 символов');
        } else {
            return;
        }
        e.preventDefault();
    };

    nameCheck = function() { // Проверка по завершении редактирования.
        var nameText = stateMap.inputs.name.value.trim(),
            emptyName = false;
        if (nameText === '') {
            emptyName = true;
        }

        configMap.resetError(stateMap.inputs.name);
        stateMap.flag.name = false;

        if (emptyName) {
            configMap.showError(stateMap.inputs.name, '* Поле не может быть пустым или из одних пробелов');
        } else if (!configMap.isAcceptableNameString.test(nameText)) {
            configMap.showError(stateMap.inputs.name, '* Должно быть от 1 до 15 букв, цифр или спецсимволов');
        } else {
            stateMap.product.name = nameText;
            stateMap.inputs.name.value = nameText;
            stateMap.flag.name = true;
        }
    };

    nameDeny = function(event) { // Запрещение копирования из буфера обмена.
        var clipboardData = event.originalEvent.clipboardData || window.clipboardData,
            pastedData;
        pastedData = clipboardData.getData('text');
        configMap.resetError(stateMap.inputs.name);
        if (!configMap.isAcceptableNameString.test(pastedData)) {
            configMap.showError(stateMap.inputs.name, '* Нельзя копировать из буфера обмена недопустимые символы');
        } else {
            return;
        }
        event.preventDefault();
    }

    countFormat = function(event) { // Проверка символов на цифры по одному.
        var e = event || window.event,
            code = e.charCode || e.keyCode,
            countSymbol;

        configMap.resetError(stateMap.inputs.count);
        if (code < configMap.controlCharMaxNum ||
			e.charCode === configMap.firefoxFuncBtnNum ||
			e.ctrlKey || e.altKey) {
            return;
        }
        countSymbol = String.fromCharCode(code);

        if (!configMap.isAcceptableCountChar.test(countSymbol)) {
            configMap.showError(stateMap.inputs.count, '* Нужно вводить цифры');
        } else if (stateMap.inputs.count.value.length >= 15) {
            configMap.showError(stateMap.inputs.count, '* Количество должно быть от 1 до 15 цифр');
        } else {
            return;
        }
        e.preventDefault();
    }

    countCheck = function() { // Проверка по завершении редактирования.
        var countNumber = stateMap.inputs.count.value,
            emptyCount = false;
        if (countNumber === '') {
            emptyCount = true;
        }

        countNumber = +countNumber; // Преобразование к числовому значению.
        configMap.resetError(stateMap.inputs.count);
        stateMap.flag.count = false;

        if (emptyCount) {
            configMap.showError(stateMap.inputs.count, '* Введена пустая строка. Повторите ввод');
        } else if (isNaN(countNumber)) {
            configMap.showError(stateMap.inputs.count, '* Введено не число. Повторите ввод');
        } else if (!countNumber) {
            stateMap.inputs.count.value = 0;
            configMap.showError(stateMap.inputs.count, '* Введён ноль. Повторите ввод');
        } else {
            stateMap.product.count = countNumber;
            stateMap.inputs.count.value = countNumber;
            stateMap.flag.count = true;
        }
    }

    countDeny = function(event) { // Запрещение копирования из буфера обмена.
        var clipboardData = event.originalEvent.clipboardData || window.clipboardData,
            pastedData;
        pastedData = clipboardData.getData('text');
        configMap.resetError(stateMap.inputs.count);
        if (!configMap.isAcceptableCountString.test(pastedData)) {
            configMap.showError(stateMap.inputs.count, '* Нельзя копировать из буфера обмена недопустимые символы');
        } else {
            return;
        }
        event.preventDefault();
    }

    priceRegain = function() { // Восстановление отображения цены при получении фокуса.
        if (stateMap.product.price) {
            stateMap.inputs.price.value = stateMap.product.price;
        }
    }

    priceFormat = function(event) { // Проверка символов по одному.
        var e = event || window.event,
            code = e.charCode || e.keyCode,
            priceSymbol;

        configMap.resetError(stateMap.inputs.price);
        if (code < configMap.controlCharMaxNum ||
			e.charCode === configMap.firefoxFuncBtnNum ||
			e.ctrlKey || e.altKey) {
            return;
        }

        priceSymbol = String.fromCharCode(code);

        if (!configMap.isAcceptablePriceChar.test(priceSymbol)) {
            configMap.showError(stateMap.inputs.price, '* Введите цифры или десятичную точку');
        } else if (stateMap.inputs.price.value.length >= 15) {
            configMap.showError(stateMap.inputs.price, '* Цена должна содержать от 1 до 15 цифр или точку');
        } else {
            return;
        }
        e.preventDefault();
    }

    priceCheck = function() { // Проверка по завершении редактирования.
        var priceNumber = stateMap.inputs.price.value,
            emptyPrice = false;

        if (priceNumber === '') {
            emptyPrice = true;
        }

        priceNumber = +priceNumber;
        configMap.resetError(stateMap.inputs.price);
        stateMap.flag.price = false;

        if (emptyPrice) {
            configMap.showError(stateMap.inputs.price, '* Введена пустая строка. Повторите ввод');
        } else if (isNaN(priceNumber)) {
            configMap.showError(stateMap.inputs.price, '* Введено не число. Повторите ввод');
        } else if (!priceNumber) {
            stateMap.inputs.price.value = 0;
            configMap.showError(stateMap.inputs.price, '* Введён ноль. Повторите ввод');
        } else {
            stateMap.product.price = Math.round(priceNumber * 100) / 100;
            stateMap.inputs.price.value = configMap.formatterUsdCur.format(priceNumber);
            stateMap.flag.price = true;
        }
    }

    priceDeny = function(event) { // Запрещение копирования из буфера обмена.
        var clipboardData = event.originalEvent.clipboardData || window.clipboardData,
            pastedData;
        pastedData = clipboardData.getData('text');
        configMap.resetError(stateMap.inputs.price);
        if (!configMap.isAcceptablePriceString.test(pastedData)) {
            configMap.showError(stateMap.inputs.price, '* Нельзя копировать из буфера обмена недопустимые символы');
        } else {
            return;
        }
        event.preventDefault();
    }

    proprietyControl = function () { // Проверка корректности ввода.
        stateMap.propriety = false;
        if (stateMap.flag.name && stateMap.flag.count && stateMap.flag.price) {
            stateMap.propriety = true;
        }
    }

    changeCheck = function (event) { // Проверка корректности ввода.
        nameCheck();
        countCheck();
        priceRegain();
        priceCheck();
        proprietyControl();
        if (stateMap.propriety) {
            stateMap.add({
                name: stateMap.product.name,
                count: stateMap.product.count,
                price: stateMap.product.price
            });
        } else {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    init = function (add, product, inputs) {
        stateMap.add = add;
        stateMap.product = product;
        stateMap.inputs = inputs;
        $(stateMap.inputs.name)
            .on({
                keypress: nameFormat,
                paste: nameDeny,
                blur: nameCheck
            });
        $(stateMap.inputs.count)
            .on({
                keypress: countFormat,
                paste: countDeny,
                blur: countCheck
            });
        $(stateMap.inputs.price)
            .on({
                focus: priceRegain,
                keypress: priceFormat,
                paste: priceDeny,
                blur: priceCheck
            });
    };

    return {
        init: init,
        changeCheck: changeCheck
    };
})();