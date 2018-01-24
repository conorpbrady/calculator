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
	console.log(operatorEnteredLast);
	if(document.querySelector("#"+pressed).className == "num") {
		operatorEnteredLast = false;
	}
	else {
		if(operatorEnteredLast) {
			display.textContent = display.textContent.slice(0,-3)
		}
		else {	
			operatorEnteredLast=true;
		}		
	}
	display.textContent += displayValue(pressed);
}

//1+1
console.log(operate(add,1,1));



let operatorEnteredLast = true;
let display = document.querySelector("#display");

var btns = document.querySelectorAll(".num, .op");

btns.forEach( btn => {
	btn.addEventListener('click', buttonPress);
});



function displayValue(idStr) {
	
	switch(idStr) {
		case "b0":
		return 0;
		case "b1":
		return 1;
		case "b2":
		return 2;
		case "b3":
		return 3;
		case "b4":
		return 4;
		case "b5":
		return 5;
		case "b6":
		return 6;
		case "b7":
		return 7;
		case "b8":
		return 8;
		case "b9":
		return 9;
		case "add":
		return " + ";
		case "div":
		return " / ";
		case "x":
		return " x ";
		case "min":
		return " - ";
		default:	
	}
	
	
}