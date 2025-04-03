const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener("click", function() {
    // // generate random hex
    let randomHex = "#";
    for(let i = 0; i < 6; i++){
        randomHex += hex[getRandomNumber()];
    };
    
    // console.log(randomHex);
    document.body.style.backgroundColor = randomHex;
    color.textContent = randomHex;
});

function getRandomNumber() {
    return Math.floor(Math.random() * hex.length); // returns random number, from 0 to 15
};