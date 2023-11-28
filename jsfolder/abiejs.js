const mainGame = document.querySelector("#dealCards");

mainGame.addEventListener("click", function() {
  document.querySelector(".startMainGame").classList.toggle("hide");
  document.querySelector(".playerChoices").classList.toggle("show");
});

const restart = document.querySelector("#dealCards6");
restart.addEventListener("click", function(){
    document.querySelector(".startMainGame").classList.toggle("hide");
    document.querySelector(".playerChoices").classList.toggle("show");
})

console.log("hi from js")