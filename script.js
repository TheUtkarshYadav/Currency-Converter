const apiKey = "453b43b410f75e41ff0c1b15";

const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

// Populating the select panels for both "from" & "to"
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value = currCode
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption)
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
}

const updateFlag = (element) => {
    // Getting the currency code using the value of the select element that we set in the above for loop
    let currCode = element.value
    // Using that currCode to get the value of country code from country list
    let countryCode = countryList[currCode]
    // changing the src for the flag image
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newSrc
}

const updateExchangeRate = async () => {
    // Now we will give form our tasks to perform
    // Accessing the entered value
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value
    // Resetting the amount value if input left empty or less than equal to zero
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1"
    }

    // Creating the URL to fetch the corresponding data from
    const URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurr.value.toLowerCase()}`
    let response = await fetch(URL)
    let data = await response.json()
    let rate = data.conversion_rates[`${toCurr.value}`]

    let finalAmount = amtVal * rate
    msg.innerText = `${amtVal}${fromCurr.value}=${finalAmount}${toCurr.value}`
}


btn.addEventListener("click", (evt) => {
    // Using this the form will stop performing it's default functions and we will be able to add our functions that we want the form to perform
    evt.preventDefault()
    updateExchangeRate()
})

window.addEventListener("load", () => {
    updateExchangeRate()
})