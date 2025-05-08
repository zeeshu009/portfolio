//Object literal counter
const counter = {
    value: 0
  };
  
  const countDisplay = document.querySelector("#count");
  const incrementBtn = document.querySelector("#increment");
  const decrementBtn = document.querySelector("#decrement");
  const resetBtn = document.querySelector("#reset");
  
  incrementBtn.addEventListener("click", () => {
    counter.value++;
    countDisplay.textContent = counter.value;
  });
  
  decrementBtn.addEventListener("click", () => {
    if (counter.value > 0) {
      counter.value--;
      countDisplay.textContent = counter.value;
    }
  });
  
  resetBtn.addEventListener("click", () => {
    counter.value = 0;
    countDisplay.textContent = counter.value;
  });