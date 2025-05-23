function add(a,b){
    return a+b;
}
function substract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}
function operate(operator,a,b){
    console.log(a,operator,b);
    a=Number(a);
    b=Number(b);
    switch(operator){
        case "+":
            return add(a,b);
        case '-':
            return substract(a,b);
        case '/':
            return divide(a,b);
        case '*':
            return multiply(a,b);
    }
}

const buttons=document.querySelectorAll("button");
buttons.forEach((button)=>{
    button.addEventListener("click",addText);
})
const lowerText=document.querySelector(".lower-text");
const upperText=document.querySelector(".upper-text");

function getLastOperaterIndex(){
    return Math.max(lowerText.textContent.lastIndexOf('*'),
    lowerText.textContent.lastIndexOf('+'),
    lowerText.textContent.lastIndexOf('-'),
    lowerText.textContent.lastIndexOf('/'));
}
function getFirstOperaterIndex(){
    return Math.min(lowerText.textContent.indexOf('*'),
    lowerText.textContent.indexOf('+'),
    lowerText.textContent.indexOf('-'),
    lowerText.textContent.indexOf('/'));
}
function isOperator(char){
    return ['/','*','+','-'].includes(char);
}
function addText(e){
    let char=e.target.textContent
    if(char==="clear"){
        clear();
        return;
    }
    else if(char==="delete"){
        back();
        return 
    }
    else if(char==="="){
        equals();
        return;
    }
    if(char==="."){
        if(lowerText.textContent.lastIndexOf('.')>getLastOperaterIndex()){
            return;
        }
    }
    let last=lowerText.textContent.slice(-1);
    if(isOperator(char)
        &&isOperator(last)){
        return;
    }
    if(isOperator(char)
        &&lowerText.textContent===""){
        return;
    }
    lowerText.textContent+=char;
}
function getPriorityOperatorIndexes(){
    let indexes=[];
    for(let i=0; i<lowerText.textContent.length;i++){
        if(lowerText.textContent[i]==="*" ||lowerText.textContent[i]==="/" ){
            indexes.push(i);
        }
    } 
    return indexes;
}
function getLesserOperatorIndexes(){
    let indexes=[];
    for(let i=0; i<lowerText.textContent.length;i++){
        if(lowerText.textContent[i]==="+" ||lowerText.textContent[i]==="-" ){
            indexes.push(i);
        }
    } 
    return indexes;
}
function getOperatorIndexes(){
    let indexes=[];
    for(let i=0; i<lowerText.textContent.length;i++){
        if(isOperator(lowerText.textContent[i])){
            indexes.push(i);
        }
    } 
    return indexes;
}
function equals(){
    let text=lowerText.textContent
    let firstOperand=""
    let operator="";
    let secondOperand="";
    let operatorIndexes=getOperatorIndexes();
    let priorityOperatorIndexes=getPriorityOperatorIndexes();

    while(priorityOperatorIndexes.length>0){
        index=priorityOperatorIndexes[0];
        let prevOp=-1
        let nextOp=(1)>=operatorIndexes.length?
                    text.length
                    :operatorIndexes[1];
        firstOperand=text.slice(prevOp+1,index);
        secondOperand=text.slice(index+1,nextOp);
        operator=text[index];
        let result=operate(operator,firstOperand,secondOperand);
        result=result.toFixed(2);
        let arr=text.split("")
        arr.splice(prevOp+1,(nextOp-prevOp-1),result);
        text=arr.join("")
        lowerText.textContent=text;
        operatorIndexes=getOperatorIndexes();
        priorityOperatorIndexes=getPriorityOperatorIndexes();
    }

    lesserOperatorIndexes=getLesserOperatorIndexes();
    while(lesserOperatorIndexes.length>0){
        index=lesserOperatorIndexes[0];
        let prevOp=-1
        let nextOp=(1)>=operatorIndexes.length?
                    text.length
                    :operatorIndexes[1];
        console.log(index +'   '+nextOp)
        firstOperand=text.slice(prevOp+1,index);
        secondOperand=text.slice(index+1,nextOp);
        operator=text[index];
        let result=operate(operator,firstOperand,secondOperand);
        result=result.toFixed(2);
        let arr=text.split("")
        arr.splice(prevOp+1,(nextOp-prevOp-1),result);
        text=arr.join("")
        lowerText.textContent=text;
        operatorIndexes=getOperatorIndexes();
        lesserOperatorIndexes=getLesserOperatorIndexes();
    
    }
}
function clear(){
    lowerText.textContent="";
    upperText.textContent="";
}
function back(){
    lowerText.textContent=lowerText.textContent.slice(0,lowerText.textContent.length-1);
}