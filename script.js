function add(num1,num2){
    return num1+num2;
}
function minus(num1,num2){
    return num1-num2;
}
function multiply(num1,num2){
    return num1*num2;
}
function divide(num1,num2){
    return num1/num2;
}
function operate(operand1,operand2,operator){
    switch(operator){
        case "+":
            return add(operand1,operand2);
            break;
        case "-":
            return minus(operand1,operand2);
            break;
        case "*":
            return multiply(operand1,operand2);
            break;
        case "/":
            return divide(operand1,operand2);
            break;
    }
}
function displayResult(result){
    display.textContent=result;
}
function populateDisplay(output){
    if(pushedEquals){
        display.textContent="";
        pushedEquals=false;
    }
    display.textContent+=output;
}
function clicked(event){
    let input=event.target.textContent;
    populateDisplay(input);
    operand+=input;
    pushedOperator=false;
}
function operatorClicked(event){
    
    if(pushedOperator){
        calculate(event);
        return;
    }
    pushedOperator=true;
    operators.push(event.target.textContent);
    operands.push(Number(operand));
    operator="";
    operand="";
}
function calculate(event){
    
    if(operand=="" || operators.length!=operands.length){
        operators.pop();
        pushedEquals=true;
    }
    console.log(operators)
    console.log(operands)
    operands.push(Number(operand));
    for(let i=0; i<operators.length;i++){
        if(["*","/"].includes(operators[i])){
            let result=operate(operands[i],operands[i+1],operators[i])
            operands.splice(i,2,result);
            operators.splice(i,1);
            i--;
        }
    }
    for(let i=0; i<operators.length;i++){
        let result=operate(operands[0],operands[1],operators[0]);
        operands.splice(0,2,result);
        operators.splice(0,1);
    }
    displayResult(operands[0]);
    pushedEquals=true;
    operands=[];
    operators=[]
    operand="";
    operator="";
}

function clearFunc(){
    operands=[];
    operators=[]
    operand="";
    operator="";
    pushedEquals=false;
    displayResult("");
}
const display=document.querySelector(".display");
const buttons=document.querySelectorAll(".digit");
buttons.forEach((elem)=>elem.addEventListener("click",clicked));
const operatorsDOM=document.querySelectorAll(".operator");
operatorsDOM.forEach((elem)=>{
    elem.addEventListener("click",(event)=>{
        populateDisplay(event.target.textContent);
        operatorClicked(event);
    })
})
const equal=document.querySelector(".equals");
equal.addEventListener("click",calculate)

const clear=document.querySelector(".clear");
clear.addEventListener("click",(e)=>clearFunc())

let operands=[];
let operators=[];
let operand="";
let operator="";
let pushedEquals=false;
let pushedOperator=true;
