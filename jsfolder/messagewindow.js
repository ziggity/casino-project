//Code for the message box
let modalMode = false;
document.querySelector("#messagebtnYes").addEventListener("click",yesClick)
document.querySelector("#messagebtnNo").addEventListener("click",noClick)
// document.querySelector("body").addEventListener("resize", resizeMessage);
window.addEventListener("resize", resizeMessage);
//timer function
async function sleep(time){
    return new Promise(resolve => setTimeout(resolve, time));
};   
//clear
function clearMessage(){
    document.querySelector(".message-window").classList.add("d-none");
    document.querySelector(".stop-screen").classList.add("d-none");
    modalMode = false;
}
//Show message window and set focus
function showMessage(message,showCancel = false){
    document.querySelector(".message-window").classList.remove("d-none");
    document.querySelector(".stop-screen").classList.remove("d-none");
    if (showCancel) {
        document.querySelector(".noBtnCol").classList.remove("d-none");
    } else{
        document.querySelector(".noBtnCol").classList.add("d-none");
    }
    resizeMessage();
    document.querySelector("#messageToDisplay").innerHTML = message;
    modalMode=true;
    checkModal()
}

//Ensure focus stays on window
async function checkModal(){
    const yesButton = document.getElementById("messagebtnYes");
    const noButton = document.getElementById("messagebtnNo");
    while (modalMode) {
        if ((!yesButton.matches(":focus")) && (!noButton.matches(":focus"))){
            document.querySelector("#messagebtnYes").focus()
        }
        await sleep(100);
    }
}

function resizeMessage(data=null){
    document.querySelector(".stop-screen").style.height = "100vh";
    if(document.querySelector(".stop-screen").clientHeight < document.querySelector("body").clientHeight) {
        document.querySelector(".stop-screen").style.height = `${document.querySelector("body").clientHeight}px`;
    }
    console.clear();
    console.log(`${document.querySelector("body").clientHeight}px`);
    console.log(`${document.querySelector(".stop-screen").clientHeight}px`);

}

//User clicks Yes/Okay
function yesClick(data){
    clearMessage()
}
//User clicks No/Cancel
function noClick(data){
    clearMessage()
}