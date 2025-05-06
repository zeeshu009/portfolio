
function add(a, b) { return a + b; }

const subtract = (a, b) => a - b;


const multiply = (a, b) => a * b;

function divide(a, b) { return b !== 0 ? a / b : "Error: Division by zero"; }




// Example usage
console.log(add(50, 3));
console.log(subtract(13, 3));
console.log(multiply(45, 3));
console.log(divide(7, 2));
console.log(divide(5, 0)); 

