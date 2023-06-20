const form = document.getElementById('form');

const phoneField = document.getElementById('phone');

const phoneInput = window.intlTelInput(phoneField, {
    preferredCountries: ["ar", "ve"],
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});

const button = document.getElementById('submit');



button.addEventListener('click', e => sendSignup(e));

function sendSignup(e) {
    enctype = "multipart/form-data" >
    e.preventDefault();

    const formData = new FormData(form)

    const phoneValue = phoneInput.getNumber()

    formData.append("phone", phoneValue)


    if (isValidated(formData) === true) {

        fetch("/user/signup", {
            method: "POST",
            body: formData,
        })
    }
}

function isValidated(form) {
    let valid = true
    form.forEach(value => !value ? valid = false : null)

    return valid
}