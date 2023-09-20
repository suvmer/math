const getEl = (id) => document.querySelector(`#${id}`);
const inputs = ["p1", "p2"];
const outputs = ["out1", "out2", "buttons", "symbols", "brackets"];
const elems = Object.fromEntries(new Map([
    ["inputs", Object.fromEntries(new Map(inputs.map(id => [id, getEl(id)])))],
    ["outputs", Object.fromEntries(new Map(outputs.map(id => [id, getEl(id)])))]
]));
console.log(elems)

elems.inputs.p1.addEventListener("input", (event) => {
    console.log(event.target.value.replace(/[^0-9\\-\\s]/g, ""))
    const nums = event.target.value.replace(/[^0-9\\-\\s]/g, "").split(" ").map(el => +el);
    console.log(nums);
})
const alph = "abcdefghijklmnopqrstivwxyz";
const brackets = ["(", ")"];
const binary = ["⇔", "⇒", "⊕", "∨", "∧"];
const unary = ["¬"];
document.querySelector("#backspace").addEventListener("click", (event) => {
    if(elems.inputs.p2.value.length == 0)
        return;
    let prev = elems.inputs.p2.selectionStart;
    let newValue = elems.inputs.p2.value.substring(0, prev-1) + elems.inputs.p2.value.substring(prev);
    elems.inputs.p2.value = newValue;// event.target.innerHTML;
    elems.inputs.p2.selectionStart = Math.max(0, prev - 1);
    elems.inputs.p2.selectionEnd = Math.max(0, prev - 1);
    updateCheck(newValue)
});

const addToKeyboard = (nodeName, values, ...classNames) => {
    values.forEach(el => {
        const element = document.createElement('button');
        element.innerHTML = el;
        element.classList.add(...classNames);
        element.addEventListener("click", (event) => {
            elems.inputs.p2.focus();
            let prev = elems.inputs.p2.selectionStart;
            let text = event.target.innerHTML;
            
            let newValue = elems.inputs.p2.value.substring(0, prev) +
            text + elems.inputs.p2.value.substring(prev);
            elems.inputs.p2.value = newValue;// event.target.innerHTML;
            elems.inputs.p2.selectionStart = prev + text.length;
            elems.inputs.p2.selectionEnd = prev + text.length;
            updateCheck(newValue)
            //elems.inputs.p2.value += event.target.innerHTML;
        })
        elems.outputs[nodeName].appendChild(element);
    })
}
addToKeyboard("buttons", [...brackets, ...binary, ...unary], "button")
addToKeyboard("symbols", alph.split(""), "button", "button_yellow")
document.body.addEventListener("click", (event) => elems.inputs.p2.focus());
let anyCorrectChar = [...alph, ...brackets, ...binary, ...unary];
let check = (str) => {
    let was = false;
    let stack = [];
    for(let symb of str) {
        console.log(stack)
        if(anyCorrectChar.indexOf(symb) === -1)
            return false;
        let last = stack[stack.length - 1];
        if(symb == '(') {
            if(stack.length > 0 && ["(", ...unary, ...binary].indexOf(last) === -1)
                return false;
            stack.push(symb);
        } else if(symb == ')'){
            if(stack.length == 0 || [")", ...alph].indexOf(last) === -1)
                return false;
            while(stack.length > 0 && stack[stack.length - 1] != '(')
                stack.pop();
            stack.pop();
            while(stack.length > 0 && [...unary, ...binary].indexOf(stack[stack.length - 1]) != -1)
                stack.pop();
        } else if(binary.indexOf(symb) !== -1) {
            if(stack.length == 0 || [")", ...alph].indexOf(last) === -1)
                return false;
            stack.push(symb);
        } else if(unary.indexOf(symb) !== -1) {
            if(stack.length > 0 && ["(", ...alph, ...unary, ...binary].indexOf(last) === -1)
                return false;
            stack.push(symb);
        } else {// if(alph.indexOf(symb) !== -1) {
            if(stack.length == 0 || ["(", ...unary, ...binary].indexOf(last) === -1)
                return false;
            stack.push(symb);
        }
    }
        console.log(stack)
        return stack.length == 0 && str.length != 0;
    //return k;
}
const updateCheck = (str) => {
    if(check(str)) {
        elems.outputs.out2.classList.remove("red")
        elems.outputs.out2.classList.add("green")
        elems.outputs.out2.innerHTML = "Да, это формула"
    } else {
        elems.outputs.out2.classList.remove("green")
        elems.outputs.out2.classList.add("red")
        elems.outputs.out2.innerHTML = "Нет, это не формула"
    }
}
elems.inputs.p2.addEventListener("input", (event) => {
    updateCheck(event.target.value.trim());
})
