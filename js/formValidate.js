var phoneNumber;
var validateForm = document.querySelector('.validate-handling__form');
var validateButton = document.querySelector('.search__submit-data');
var validateFormElements = document.querySelectorAll('.validate-handling__input');
var phoneInputs = document.querySelectorAll('input[data-tel-input]');
var validationTooltip = document.querySelectorAll('.validate-handling-tooltip-message');

document.querySelectorAll('.validate-handling-tooltip-message').forEach( function(e) {
    e.addEventListener( 'focusin', function (event) { 
        this.classList.add('hide-tooltip-message');
    })
})

function changeFormHandler() {
    if (validateForm.checkValidity()) {
        validateButton.removeAttribute('disabled');
    }
}

var changeDefaultFormMessage = function (e) {
    var сhC = 'validate-handling__input_invalid';
    var chY = 'hide-tooltip-message';
    var chH = 'data-input';
    var i = e.target.classList;
    var m = e.target.nextElementSibling.classList;
    if (e.type == 'input'){
        validationTooltip.forEach( function(x) {
            var v = x.classList;
            if(v !== m) {
                if (!v.contains(chY)) {
                    v.add(chY);
                }
            }
        })
        e.target.setAttribute(chH, true);
    }
    if (e.type == 'blur'){
        if (e.target.getAttribute(chH)) {
            if (m.contains(chY)) {
                m.remove(chY);
            }
            e.preventDefault();
            i.add(сhC);
            e.target.removeAttribute(chH)
        }
    }
}

var getInputNumbersValue = function (input) {
    // Return stripped input value — just numbers
    return input.value.replace(/\D/g, '');
}

var onPhonePaste = function (e) {
    var input = e.target,
        inputNumbersValue = getInputNumbersValue(input);
    var pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
        var pastedText = pasted.getData('Text');
        if (/\D/g.test(pastedText)) {
            // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
            // formatting will be in onPhoneInput handler
            input.value = inputNumbersValue;
            return;
        }
    }
}

var onPhoneInput = function (e) {
    var input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        currentValue;
        formattedInputValue = "";

    if (!inputNumbersValue) {
        return input.value = "";
    }

    if (input.value.length != selectionStart) {
        // Editing in the middle of input, not last symbol
        if (e.data && /\D/g.test(e.data)) {
            // Attempt to input non-numeric symbol
            input.value = inputNumbersValue;
        }
        return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
        var firstSymbols = "+7";
        if (inputNumbersValue[0] == "8") {}
        formattedInputValue = input.value = firstSymbols + " ";
        if (inputNumbersValue.length > 1) {
            formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
            formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
            formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
            formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }
        currentValue = inputNumbersValue.substring(0, 11);
    } else {
        formattedInputValue = '+' + inputNumbersValue.substring(0, 17);
        currentValue = inputNumbersValue.substring(0, 17);
    }
    input.value = formattedInputValue;
    if (inputNumbersValue.length > 10 && inputNumbersValue.length < 17 ) phoneNumber = currentValue;
}
var onPhoneKeyDown = function (e) {
    // Clear input after remove last symbol
    var inputValue = e.target.value.replace(/\D/g, '');
    if (e.keyCode == 8 && inputValue.length == 1) {
        e.target.value = "";
    }
}
for (var phoneInput of phoneInputs) {
    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('input', onPhoneInput, false);
    phoneInput.addEventListener('paste', onPhonePaste, false);
}
for (var validateFormElement of validateFormElements) {
    validateFormElement.addEventListener('blur', changeDefaultFormMessage);
    validateFormElement.addEventListener('input', changeDefaultFormMessage);
}
validateForm.addEventListener('change', changeFormHandler);

validateForm.addEventListener('submit', function(e){
    document.querySelector('#vhTelValue').value = phoneNumber;
})

