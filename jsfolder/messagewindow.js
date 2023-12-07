//Code for the message box
const messageBox = document.querySelector(".message-window");
const stopScreen = document.querySelector(".stop-screen");

let modalMode = false;
let modalWidth = 30;
let modalHeight = 30;

let yesCallback = doNothing;
let noCallback = doNothing;

document.querySelector("#messagebtnYes").addEventListener("click", (event) => { yesClick(event, yesCallback) });
document.querySelector("#messagebtnNo").addEventListener("click", (event) => { noClick(event, noCallback) });
// document.querySelector("body").addEventListener("resize", resizeMessage);
window.addEventListener("resize", resizeMessage);
//timer function
async function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
};
//clear
function clearMessage() {
    messageBox.classList.add("d-none");
    stopScreen.classList.add("d-none");
    modalMode = false;
}
//Show message window and set focus
function showMessage(message, yesFunc = doNothing, noFunc = doNothing, msgWidth = 30, msgHeight = -1, showCancel = false) {
    modalWidth = msgWidth;
    modalHeight = msgHeight;
    yesCallback = yesFunc
    noCallback = noFunc

    messageBox.classList.remove("d-none");
    stopScreen.classList.remove("d-none");
    if (showCancel) {
        document.querySelector(".noBtnCol").classList.remove("d-none");
    } else {
        document.querySelector(".noBtnCol").classList.add("d-none");
    }
    resizeMessage();
    document.querySelector("#messageToDisplay").innerHTML = message;
    modalMode = true;
    checkModal();
}

//Ensure focus stays on window
async function checkModal() {
    const yesButton = document.getElementById("messagebtnYes");
    const noButton = document.getElementById("messagebtnNo");
    while (modalMode) {
        if ((!yesButton.matches(":focus")) && (!noButton.matches(":focus"))) {
            document.querySelector("#messagebtnYes").focus()
        }
        await sleep(100);
    }
}

//Resize the modal background depending on window size
function resizeMessage(data = null) {
    messageBox.style.width =  modalWidth + "vw";
    messageBox.style.left = (50-(modalWidth/2)) + "vw"
    if (modalHeight !==-1) {
        messageBox.style.height = modalHeight + "vh";
    }else {
        messageBox.style.height = "auto";
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