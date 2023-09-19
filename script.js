const getEl = (id) => document.querySelector(`#${id}`);
const inputs = ["p1", "p2"];
const outputs = ["out1", "out2"];
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
let k = false;
let check = (str) => {
    let was = false;
    let stack = [];
    for(let symb of str) {
        if(symb == '(') {
            if(stack.length > 0 && ["(", "!"].find(stack[stack.length - 1]) === undefined)
                return false;
            stack.push('(');
        } else {
            
        }
    }
    return k;
}
elems.inputs.p2.addEventListener("input", (event) => {
    console.log()
    if(check(event.target.value.trim())) {
        elems.outputs.out2.classList.remove("red")
        elems.outputs.out2.classList.add("green")
        elems.outputs.out2.innerHTML = "Да, это формула"
    } else {
        elems.outputs.out2.classList.remove("green")
        elems.outputs.out2.classList.add("red")
        elems.outputs.out2.innerHTML = "Нет, это не формула"
    }
})
