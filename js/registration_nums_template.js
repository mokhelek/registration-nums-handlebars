let registrationNumbersTemplate = [];
if (localStorage["regNumbersList-template"]) {
    registrationNumbersTemplate = localStorage["regNumbersList-template"].split(",");
}

let regFactoryTemplate = regNumbersFactoryTemplate(registrationNumbersTemplate); // ? my instance variable

let regNumListTemplate = document.querySelector(".reg-nums-list-template");
let regInputTemplate = document.querySelector(".reg-num-input-template");

// ************************** Default Display Of Registration Numbers & Counters *******************
for (let i = 0; i < registrationNumbersTemplate.length; i++) {
    const listItem = document.createElement("li");

    listItem.textContent = registrationNumbersTemplate[i];
    regNumListTemplate.appendChild(listItem);
}

// ************************************** END  *****************************************

// ************************** Filtered Display Of Registration Numbers *******************
function displayFilteredRegTemplate() {
    let regListDiv = document.querySelector(".reg-nums-list-template");
    let regList = regListDiv.querySelectorAll("li");
    let notFound = document.querySelector(".not-found-template");
    notFound.style.display = "none";
    regList.forEach(function (e) {
        e.style.display = "none";
    });
    if (registrationNumbersTemplate.length > 0) {
        for (let i = 0; i < registrationNumbersTemplate.length; i++) {
            const listItem = document.createElement("li");

            listItem.textContent = registrationNumbersTemplate[i];
            regNumListTemplate.appendChild(listItem);
        }
    } else {
        notFound.style.display = "block";
    }
}
// ************************************** END  *****************************************

function addRegistrationTemplate() {
    let duplicateError = document.querySelector("#duplicate-error");
    let emptyInputError = document.querySelector("#empty-input-error");
    let formatError = document.querySelector("#format-error");

    if (regInputTemplate.value != "") {
        if (regFactoryTemplate.regFormatCheck(regInputTemplate.value.replace(/\s/g, ""))) {
            if (regFactoryTemplate.handleDuplicates(regInputTemplate.value.toUpperCase().replace(/\s/g, ""))) {
                
                regFactoryTemplate.addRegNum(regInputTemplate.value.toUpperCase().replace(/\s/g, ""));
                // todo -> This is what I gotta put in template 
                // listItem.textContent = registrationNumbersTemplate[registrationNumbersTemplate.length - 1];

                let template = document.querySelector(".regNumListTemplate").innerHTML ;
                let compiledTemplate = Handlebars.compile(template);
                console.log(registrationNumbersTemplate)
                let myData = {
                    "regNums":  registrationNumbersTemplate  
                }

                regNumListTemplate.innerHTML = compiledTemplate(myData) ;

                // regNumListTemplate.appendChild(listItem);

                // regNumListTemplate.insertBefore(listItem, regNumListTemplate.childNodes[0]);

                localStorage["regNumbersList-template"] = regFactoryTemplate.getRegistrations();
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

const addButtonTemplate = document.querySelector("#add-btn-template");
addButtonTemplate.addEventListener("click", addRegistrationTemplate);

// Todo : ############################################ The Clear Function #######################################

const clearButtonTemplate = document.querySelector("#clear-btn-template");
clearButtonTemplate.addEventListener("click", function () {
    if (confirm("Your data will be permanently deleted")) {
        regFactoryTemplate.clearData();
    }
});

// Todo : ############################################ The Filter Function #######################################

let dropdownTemplate = document.querySelector("#dropDownTemplate");
 
function cleanSelected() {
    let selectedClass = document.querySelectorAll(".selected-card");
    selectedClass.forEach((item) => {
        item.classList.remove("selected-card");
    });
}

dropdownTemplate.addEventListener("change", function () {
    registrationNumbersTemplate = regFactoryTemplate.filterRegNumbers(dropdownTemplate.value);

    displayFilteredRegTemplate();
});
