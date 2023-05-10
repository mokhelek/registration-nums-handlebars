let registrationNumbers = [];
if (localStorage["regNumbersList"]) {
    registrationNumbers = localStorage["regNumbersList"].split(",");
}

let countingPlaces = regNumbersFactory(registrationNumbers).getCountingPlaces();
if (localStorage["counting_towns"]) {
    countingPlaces = JSON.parse(localStorage["counting_towns"]);
}

let regFactory = regNumbersFactory(registrationNumbers, countingPlaces); // ? my instance variable

let regNumList = document.querySelector(".reg-nums-list");
let regInput = document.querySelector(".reg-num-input");


// ************************** Default Display Of Registration Numbers & Counters *******************
for (let i = 0; i < registrationNumbers.length; i++) {
    const listItem = document.createElement("li");

    listItem.textContent = registrationNumbers[i];
    regNumList.appendChild(listItem);
}

// ************************************** END  *****************************************

// ************************** Filtered Display Of Registration Numbers *******************
function displayFilteredReg() {
    let regListDiv = document.querySelector(".reg-nums-list");
    let regList = regListDiv.querySelectorAll("li");
    let notFound = document.querySelector(".not-found");
    notFound.style.display = "none";
    regList.forEach(function (e) {
        e.style.display = "none";
    });
    if (registrationNumbers.length > 0) {
        for (let i = 0; i < registrationNumbers.length; i++) {
            const listItem = document.createElement("li");

            listItem.textContent = registrationNumbers[i];
            regNumList.appendChild(listItem);
        }
    } else {
        notFound.style.display = "block";
    }
}
// ************************************** END  *****************************************


function addRegistration() {
    let duplicateError = document.querySelector("#duplicate-error");
    let emptyInputError = document.querySelector("#empty-input-error");
    let formatError = document.querySelector("#format-error");

    if (regInput.value != "") {
        if (regFactory.regFormatCheck(regInput.value.replace(/\s/g, ""))) {
            if (regFactory.handleDuplicates(regInput.value.toUpperCase().replace(/\s/g, ""))) {
                const listItem = document.createElement("li");

                regFactory.addRegNum(regInput.value.toUpperCase().replace(/\s/g, ""));

                listItem.textContent = registrationNumbers[registrationNumbers.length - 1];
                regNumList.appendChild(listItem);

                regNumList.insertBefore(listItem, regNumList.childNodes[0]);

                localStorage["regNumbersList"] = regFactory.getRegistrations();

            } else {
                duplicateError.style.display = "block";
                setTimeout(function () {
                    duplicateError.style.display = "none";
                }, 3000);
            }
        } else {
            formatError.style.display = "block";
            setTimeout(function () {
                formatError.style.display = "none";
            }, 3000);
        }
    } else {
        emptyInputError.style.display = "block";
        setTimeout(function () {
            emptyInputError.style.display = "none";
        }, 3000);
    }
}

const addButton = document.querySelector("#add-btn");
addButton.addEventListener("click", addRegistration);

// Todo : ############################################ The Clear Function #######################################

const clearButton = document.querySelector("#clear-btn");
clearButton.addEventListener("click", function () {
    if (confirm("Your data will be permanently deleted")) {
        regFactory.clearData();
    }
});

// Todo : ############################################ The Filter Function #######################################

let dropdown = document.querySelector("#dropDown");

function cleanSelected(){
    let selectedClass = document.querySelectorAll(".selected-card");
    selectedClass.forEach((item)=>{
        item.classList.remove("selected-card")
    })
}

dropdown.addEventListener("change",function(){
    registrationNumbers = regFactory.filterRegNumbers(dropDown.value);
    
    displayFilteredReg();
})

