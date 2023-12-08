//Code for the modal boxes
const messageBox = document.querySelector(".message-window");
const stopScreen = document.querySelector(".stop-screen");
const msgYesButton = document.querySelector("#messagebtnYes");
const msgNoButton = document.querySelector("#messagebtnNo");


const optionsWindow = document.querySelector(".options-window");
const optOkButton = document.querySelector("#optionsOk");
const optCancelButton = document.querySelector("#optionsCancel");
const musicSlider = document.querySelector("#musicVolSlider");
const noiseSlider = document.querySelector("#noiseVolSlider");
const effectsSlider = document.querySelector("#soundVolSlider");



let modalMode = false;
let modalWidth = 30;
let modalHeight = 30;
let currentModal = "msg";

let yesCallback = doNothing;
let noCallback = doNothing;

msgYesButton.addEventListener("click", (event) => { msgYesClick(event, yesCallback) });
msgNoButton.addEventListener("click", (event) => { msgNoClick(event, noCallback) });
optOkButton.addEventListener("click", optOkClick);
optCancelButton.addEventListener("click", optCancelClick);


window.addEventListener("resize", resizeMessage);
//timer function
async function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
};
//clear
function clearMessage() {
    messageBox.classList.add("d-none");
    stopScreen.classList.add("d-none");
    optionsWindow.classList.add("d-none");
    modalMode = false;
}
//Show message window and set focus
function showMessage(message, yesFunc = doNothing, noFunc = doNothing, msgWidth = 30, msgHeight = -1, msgType = "Ok") {
    modalWidth = msgWidth;
    modalHeight = msgHeight;
    currentModal = "msg";
    yesCallback = yesFunc
    noCallback = noFunc

    messageBox.classList.remove("d-none");
    stopScreen.classList.remove("d-none");

    //Nested function to hide/show "No" button
    function hideNoButton(hide = true){
        if (hide) {
            document.querySelector(".noBtnCol").classList.add("d-none");
        } else{
            document.querySelector(".noBtnCol").classList.remove("d-none");
        }

    }
    //Nested function to change type from Yes/No to Ok/Cancel
    function OkCancelType(isOk =true){
        if (isOk){
            msgYesButton.innerText = "Ok";
            msgNoButton.innerText = "Cancel";
        } else {
            msgYesButton.innerText = "Yes";
            msgNoButton.innerText = "No";
        }

    }

    //Set the message box type
    switch (msgType){
        case "OkCancel":
            OkCancelType();
            hideNoButton(false);
            break;
        case "Yes":
            OkCancelType(false);
            hideNoButton();
        case "YesNo":
            OkCancelType(false);
            hideNoButton(false);
            break;
        default:
            OkCancelType();
            hideNoButton();
    }

    resizeMessage();
    //Message can contain HTML elements:
    document.querySelector("#messageToDisplay").innerHTML = message;
    modalMode = true;
    checkModal();
}

function showOptions(optWidth = 30, optHeight = -1){
    modalWidth = optWidth;
    modalHeight = optHeight;
    currentModal = "opt";

    optionsWindow.classList.remove("d-none");
    stopScreen.classList.remove("d-none");

    resizeMessage();
    checkModal();

}

//Ensure focus stays on window
async function checkModal() {
    
    while (modalMode) {
        if (currentModal = "msg"){
            if ((!msgYesButton.matches(":focus")) && (!msgNoButton.matches(":focus"))) {
                msgYesButton.focus()
            }
            await sleep(100);
         } else {
            if (!optionsWindow.matches(":focus")) {
                optionsWindow.focus();
            }
         }
    }
}

//Resize the modal background depending on window size
function resizeMessage(data = null) {
    messageBox.style.width =  modalWidth + "vw";
    messageBox.style.left = (50-(modalWidth/2)) + "vw"
    optionsWindow.style.width =  modalWidth + "vw";
    optionsWindow.style.left = (50-(modalWidth/2)) + "vw"
    
    if (modalHeight !==-1) {
        messageBox.style.height = modalHeight + "vh";
        optionsWindow.style.height = modalHeight + "vh";
    }else {
        messageBox.style.height = "auto";
        optionsWindow.style.height = "auto";
    }
    stopScreen.style.height = "100vh";
    if (stopScreen.clientHeight < document.querySelector("body").clientHeight) {
        stopScreen.style.height = `${document.querySelector("body").clientHeight}px`;
    }
}

//User clicks Yes/Okay
function msgYesClick(data, callback = doNothing) {
    callback();
    clearMessage();
    document.getElementById('dealCards').click();
    // enableButtons();
}
//User clicks No/Cancel
function msgNoClick(data, callback = doNothing) {
    callback();
    clearMessage();
}
function doNothing() {
    return;
}

function optOkClick(data){
    saveSoundValues(true);
    clearMessage();
}

function optCancelClick(data){
    saveSoundValues(false);
    clearMessage();
}