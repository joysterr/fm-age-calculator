import { calc } from "./calc.js"

const outputDay = document.getElementById('outputDay')
const outputMonth = document.getElementById('outputMonth')
const outputYear = document.getElementById('outputYear')
const inputForm = document.getElementById('inputForm')

const inputLabel = document.querySelectorAll('.input__label')
const userInput = document.querySelectorAll('.user__input')
const inputError = document.querySelectorAll('.input__error')

const today = new Date()

// handle submit
inputForm.addEventListener('submit', (e) => {
    handleSubmit(e)
})

function handleSubmit(e) {
    e.preventDefault()

    const inputDay = document.getElementById('inputDay').value
    const inputMonth = document.getElementById('inputMonth').value
    const inputYear = document.getElementById('inputYear').value
    
    const inputData = { inputDay, inputMonth, inputYear }

    console.log(inputData)

    const isInputValid = formValidation(inputData)

    if (!isInputValid) {
        // reset inputs
        userInput.forEach((input) => {
            input.addEventListener('click', () => {
                resetInputs()
            })
        })
    }

    if (isInputValid) {
        const output = calc(inputYear, inputMonth, inputDay)
        outputDay.innerHTML = output[2]
        outputMonth.innerHTML = output[1]
        outputYear.innerHTML = output[0]
    }
}

function formValidation(inputData) {

    const { inputDay, inputMonth, inputYear } = inputData

    if (inputDay === '' && inputMonth === '' && inputYear === '') {
        toggleError(true)
        inputError.forEach(error => {
            error.innerHTML = 'This field is required'
        })
        console.log('error: no input')
        return false
    }
    else if (!isValidDay(inputDay) && !isValidMonth(inputMonth) && !isValidYear(inputYear)) {
        toggleError(true)
        inputError[0].innerHTML = 'Must be a valid day'
        inputError[1].innerHTML = 'Must be a valid month'
        inputError[2].innerHTML = 'Must be in the past'
        return false
    }
    else if (!isValidDay(inputDay)) {
        toggleError(true)
        inputError[0].innerHTML = 'Must be a valid day'
        return false
    }
    else if (!isValidMonth(inputMonth)) {
        toggleError(true)
        inputError[1].innerHTML = 'Must be a valid month'
        return false
    }
    else if (!isValidYear(inputYear)) {
        toggleError(true)
        inputError[2].innerHTML = 'Must be in the past'
        return false
    }
    else {
        console.log('valid. all good.')
        return true
    }
}


function isValidDay(inputDay) {
    return (inputDay <= 0  || inputDay > 31) ? false : true
}

function isValidMonth(inputMonth) {
    return (inputMonth <= 0 || inputMonth > 12) ? false : true
}

function isValidYear(inputYear) {
    return (inputYear > today.getFullYear()) ? false : true
}

function resetInputs() {
    toggleError(false)
}


function toggleError(boo) {
    if (boo) {
        inputLabel.forEach(label => {
            label.classList.add('error')
        })
        userInput.forEach(input => {
            input.classList.add('error-outline')
        })
    } else {
        userInput.forEach((input) => {
            input.value = ''
        })
        inputLabel.forEach(label => {
            label.classList.remove('error')
        })
        userInput.forEach(input => {
            input.classList.remove('error-outline')
        })
        inputError.forEach(error => {
            error.innerHTML = '&nbsp;'
        })
    }
}