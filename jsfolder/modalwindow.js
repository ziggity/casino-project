//Code for the message box
const messageBox = document.querySelector(".message-window");
const stopScreen = document.querySelector(".stop-screen");
const optionsWindow = document.querySelector(".options-window");

let modalMode = false;
let modalWidth = 30;
let modalHeight = 30;
let currentModal = "msg";

let yesCallback = doNothing;
let noCallback = doNothing;

document.querySelector("#messagebtnYes").addEventListener("click", (event) => { yesClick(event, yesCallback) });
document.querySelector("#messagebtnNo").addEventListener("click", (event) => { noClick(event, noCallback) });
document.querySelector("#optionsOk").addEventListener("click", clearMessage);
document.querySelector("#optionsCancel").addEventListener("click", clearMessage);


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
    const yesButton = document.getElementById("messagebtnYes");
    const noButton = document.getElementById("messagebtnNo");

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
            yesButton.innerText = "Ok";
            noButton.innerText = "Cancel";
        } else {
            yesButton.innerText = "Yes";
            noButton.innerText = "No";
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

//Ensure focus stays on window
async function checkModal() {
    const yesButton = document.getElementById("messagebtnYes");
    const noButton = document.getElementById("messagebtnNo");
    
    while (modalMode) {
        if (currentModal = "msg"){
            if ((!yesButton.matches(":focus")) && (!noButton.matches(":focus"))) {
                document.querySelector("#messagebtnYes").focus()
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
function yesClick(data, callback = doNothing) {
    callback();
    clearMessage();
}
//User clicks No/Cancel
function noClick(data, callback = doNothing) {
    callback();
    clearMessage();
}
function doNothing() {
    return;
}

function showOptions(optWidth = 30, optHeight = 30){
    modalWidth = optWidth;
    modalHeight = optHeight;
    currentModal = "opt";

    optionsWindow.classList.remove("d-none");
    stopScreen.classList.remove("d-none");

    resizeMessage()
    checkModal()

}