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
function modulus(a,b){
    return a%b;
}
function operate(operand1,operand2,operator){
    let result=0;
    switch(operator){
        case "+":
            result=add(operand1,operand2);
            break;
        case "-":
            result=substract(operand1,operand2);
            break;
        case "*":
            result=multiply(operand1,operand2);
            break;
        case "/":
            result=divide(operand1,operand2);
            break;
        case "%":
            result=modulus(operand1,operand2);
            break;
    }
    return result;
}
function parseToArray(str){
    if(str.length==0){
        return;
    }
    if(["-","+","*","/","%"].includes(str[str.length-1])){
        str=str.slice(0,str.length-1);
    }
    let strArray=[];
    let addStr="";
    for(let i=0; i<str.length;i++){
        switch(str.charAt(i)){
            case "(":
                addStr+=str[i+1];
                i++;
                break;
            case ")":
                break;
            case "+":
            case "-":
            case "*":
            case "/":
            case "%":
                strArray.push(Number(addStr));
                strArray.push(str.charAt(i));
                addStr="";
                break;
            default:
                addStr+=str.charAt(i);
        }
    }
    strArray.push(Number(addStr));
    return strArray;
}
function calculate(){
    let strArray=parseToArray(result.textContent);
    while(strArray.length>1){
        let res=operate(strArray[0],strArray[2],strArray[1]);
        strArray.splice(0,3,res);
    }
    history.textContent=result.textContent;
    result.textContent=strArray[0];
}
function clear(){
    result.textContent="";
    history.textContent="";
}
function flipSign(){
    let resultText=result.textContent;
    if(resultText.length==0||["-","+","*","/","%"].includes(resultText[resultText.length-1])){
        return;
    }
    let flipped=false;
    if(resultText[resultText.length-1]==")"){
        flipped=true;
    }
    for(let i=resultText.length-2;i>=0;i--){

        switch(resultText.charAt(i)){
            case "(":
                resultText=resultText.slice(0,i)+resultText.slice(i+2,resultText.length-1)
                result.textContent=resultText;
                return;
                break;
            case "-":
                if(!flipped){
                    resultText=resultText.slice(0,i)+"+"+resultText.slice(i+1);
                    result.textContent=resultText;
                    return;
                }
                break;
            case "+":
            case "*":
            case "/":
            case "%":
                if(!flipped){
                    resultText=resultText.slice(0,i+1)+"(-"+resultText.slice(i+1)+")"
                    result.textContent=resultText;
                    return;
                }
                break;
        }
    }
    
    resultText="(-"+resultText+")";
    result.textContent=resultText;
}
function addToDisplay(content){
    if(content=="." && 
            (
                ["-","+","*","/","%"].includes(result.textContent[result.textContent.length-1])
                ||result.textContent.length==0
            )
        ){
        result.textContent+="0"
    }
    result.textContent+=content
}
function adjustDisables(content){
    switch(content){
        case "+":
        case "-":
        case "*":
        case "/":
        case "%":
            operators.forEach((e)=>e.disabled=true);
            dot.disabled=false;
            break;
        case ".":
            dot.disabled=true;
        default:
            operators.forEach((e)=>e.disabled=false);
    }
}
function backspace(){
    let resultText=result.textContent;
    if(resultText[resultText.length-1]=="."){
        dot.disabled=false;
    }
    resultText=resultText.slice(0,resultText.length-1)
    adjustDisables(resultText[resultText.length-1]);
    
    result.textContent=resultText;
}
function buttonPressed(event){
    switch(event.target.textContent){
        case "C":
            clear();
            break;
        case "+/-":
            flipSign();
            break;
        case "=":
            calculate();
            break;
        case "<":
            backspace();
            break;
        default:
            addToDisplay(event.target.textContent);
            adjustDisables(event.target.textContent);
    }
}

const buttons=document.querySelectorAll(".buttons");
const operators=document.querySelectorAll(".operators");
operators.forEach((e)=>e.disabled=true);
const dot=document.querySelector(".dot")
buttons.forEach((element)=>{
    element.addEventListener("click",buttonPressed);
})
const history=document.querySelector(".history");
const result=document.querySelector(".result");