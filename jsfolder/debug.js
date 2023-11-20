//For debug and logs

function logEvent(currentFunction, currentEvent, extraInfo, throwAlert){
    console.log (`Procedure: ${currentFunction}\nEvent: ${currentEvent}\nMisc: ${extraInfo}`);
    if (throwAlert){
        alert(`Procedure: ${currentFunction}\nEvent: ${currentEvent}\nMisc: ${extraInfo}`)
    }
}