nameForm = document.getElementById("saveName");
changeForm = document.getElementById("changeName");
inputBox = document.getElementById("userName");
welcomeText = document.getElementById("welcomeText");

inputBox.addEventListener("keyup",limitNameLength);
// inputBox.addEventListener("keydown",saveMyName);


function openSettingtoStart() {
    document.querySelector(".navbar-setting").classList.toggle("start");
    document.querySelector(".setting").classList.toggle("menu");
  }
  function backToFirstPage() {
    document.querySelector(".navbar-setting").classList.toggle("start");
    document.querySelector(".setting").classList.toggle("menu");
  }
  
  function saveMyName(event){
    
    const userName = inputBox.value;
    if (!userName) userName = "Player"

    nameForm.classList.add("d-none");
    changeForm.classList.remove("d-none");
    welcomeText.textContent = "Welcome " + userName;
    sessionStorage.setItem("userName",userName);
  }

  function reEnter(){
    nameForm.classList.remove("d-none");
    changeForm.classList.add("d-none");

  }

  function limitNameLength(){
    const tempText = inputBox.value;
    if (tempText.length > 10){
      inputBox.value = tempText.slice(0,10);
    }
  }