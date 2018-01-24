//calc.js

function operate(func,a,b) {
  return func(a,b);
}

function add(a,b) {
  return a+b;
}

function sub(a,b) {

}

function mul(a,b) {

}

function div(a,b) {

}

let buttonPress = (e) => {
	pressed = e.target.id;
	display.textContent += e.target.id;
}

//1+1
console.log(operate(add,1,1));




let display = document.querySelector("#display");

var btns = document.querySelectorAll(".num, .op");

btns.forEach( btn => {
	btn.addEventListener('click', buttonPress);
});