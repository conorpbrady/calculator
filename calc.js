//calc.js

//Implement clear
//Find out why equal erases first part of fullExpression
//Handle negative numbers
//Fix display CSS font sizes and such

//Decinal, Percent, +/-




function operate(func,a,b) {
  return func(a,b);
}

function add(match,p1,p2,offset,string) {
  return ""+(+p1+ +p2);
}

function sub(match,p1,p2,offset,string) {
  return ""+(p1-p2);
}

function mul(match,p1,p2,offset,string) {
  return ""+(p1*p2);
}

function div(match,p1,p2,offset,string) {
  return ""+(p1/p2);
}

function evaluate() {

  eval = expression;


  mRx = /([0-9]+) x ([0-9]+)/;
  dRx = /([0-9]+) \/ ([0-9]+)/;
  aRx = /([0-9]+) \+ ([0-9]+)/;
  sRx = /([0-9]+) - ([0-9]+)/;

  while(mRx.test(eval)){
    eval = eval.replace(mRx,mul);
  }

  while(dRx.test(eval)){
    eval = eval.replace(dRx,div);
  }

  while(sRx.test(eval)) {
    eval = eval.replace(sRx,sub);
  }
  while(aRx.test(eval)) {
    eval = eval.replace(aRx,add);
  }



  return eval;


}

let buttonPress = (e) => {
	pressed = e.target.id;

	if(document.querySelector("#"+pressed).className == "num") {
    if(operatorEnteredLast) {
      calcField.textContent = displayValue(pressed);
    }
    else {
      calcField.textContent += displayValue(pressed);
    }
    operatorEnteredLast = false;
	}
	else if(document.querySelector("#"+pressed).className == "op"){

		if(operatorEnteredLast) {
			expression = expression.slice(0,-3)
		}
		else {
      if(multiplyFlag && (pressed == "add" || pressed =="min")) {
        calcField.textContent = evaluate();
      }
      if(additionFlag && (pressed == "add" || pressed =="min")) {
        calcField.textContent = evaluate();
      }
			operatorEnteredLast=true;
		}

	}
  else {
    expression = evaluate();
    calcField.textContent = expression;
    }


  if(pressed == "mul" || pressed=="div") {
    multiplyFlag = true;
    additionFlag = false;
  }
  if(pressed == "add" || pressed =="min") {
    multiplyFlag = false;
    additionFlag = true;
  }

  expression += displayValue(pressed);

  //calcField.textContent = displayExpression(pressed);
  fullExpression.textContent = expression;
  console.log(expression);
}



let expression = "";
let multiplyFlag = false;
let additionFlag = false;
let operatorEnteredLast = true;
let fullExpression = document.querySelector("#fullexpression");
let calcField = document.querySelector('#calcField');

fullExpression.textContent = '';
calcField.textContent = '';

var btns = document.querySelectorAll(".num, .op,.equal");

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
		case "mul":
		return " x ";
		case "min":
		return " - ";
		default:
    return "";
	}


}
