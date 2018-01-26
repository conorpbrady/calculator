//calc.js

/*
DONE: Implement clear
DONE: Find out why equal erases first part of fullExpression
DONE: Handle negative numbers
DONE: Fix display CSS font sizes and such

DONE: Percent
DONE: Plus/Minus
DONE: Decimal
  DONE: Only one decimal per numbers
  DONE: Regex needs to match decimal numbers
  DONE: Round numbers

TODO: Make it look nice
DONE: Handle div by 0
  DONE: NaN is good.  Need to remove when number is pressed.
TODO: Add Backspace button
TODO: Add Keyboard Support

TODO: Refactor code
TODO: Comment code
*/

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
  if(p2==0) {return "Error";}
  return ""+(p1/p2);
}

function round(num, dec) {
  return Number(Math.round(num + 'e' + dec) + 'e-' + dec);
}
function evaluate() {

  eval = expression;


  mRx = /(-*[0-9]+\.?[0-9]*) x (-*[0-9]+\.?[0-9]*)/;
  dRx = /(-*[0-9]+\.?[0-9]*) \/ (-*[0-9]+\.?[0-9]*)/;
  aRx = /(-*[0-9]+\.?[0-9]*) \+ (-*[0-9]+\.?[0-9]*)/;
  sRx = /(-*[0-9]+\.?[0-9]*) - (-*[0-9]+\.?[0-9]*)/;

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


  return round(eval,5);



}

let buttonPress = (e) => {
	pressed = e.target.id;

	if(document.querySelector("#"+pressed).className == "num") {
    if(pressed == "plus") {
      if(/-/.test(calcField.textContent)) {
        calcField.textContent = calcField.textContent.substr(1);
      }
      else {
        calcField.textContent = "-" + calcField.textContent;
      }
      negativeInExpression = /-([0-9]+\.?[0-9]*\s?[+-/x]?\s?)$/;
      positiveInExpression = /([0-9]+\.?[0-9]*\s?[+-/x]?\s?)$/;
      if(negativeInExpression.test(expression)) {
        expression = expression.replace(negativeInExpression,"$1");
      }
      else {
        expression = expression.replace(positiveInExpression,"-$1");
      }
    }

    if(pressed == "dot" && /\./.test(calcField.textContent)) {
      return;
    }
    if(operatorEnteredLast || calcField.textContent == "NaN") {
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
      if(pressed == "perc") {
        expression += " / 100";
        calcField.textContent = expression = evaluate();
        operatorEnteredLast = false;
      }
		}

	}
  else if(document.querySelector("#"+pressed).className == "equal"){
    expression = evaluate();
    calcField.textContent = expression;
    }
  else if(document.querySelector("#"+pressed).className == "clr") {
      expression = '';
      eval = '';
      calcField.textContent = '0';
      operatorEnteredLast=true;
      multiplyFlag = additionFlag = false;
    }


  if(pressed == "mul" || pressed=="div") {
    multiplyFlag = true;
    additionFlag = false;
  }
  if(pressed == "add" || pressed =="min") {
    multiplyFlag = false;
    additionFlag = true;
  }

  if(expression=="NaN") {expression = displayValue(pressed);}
  else {expression += displayValue(pressed);}

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
calcField.textContent = '0';

var btns = document.querySelectorAll(".num, .op,.equal,.clr");

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
    case "dot":
    return ".";
		default:
    return "";
	}


}
