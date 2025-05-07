
let tasks = [];

function addTask(task) {
    tasks.push(task);
    console.log(`Task "${task}" added.`);
}

function removeTask(index) {
    if (index >= 0 && index < tasks.length) {
        let removed = tasks.splice(index, 1);
        console.log(`Task "${removed[0]}" removed.`);
    } else {
        console.log("Invalid index.");
    }
}

function listTasks() {
    if (tasks.length === 0) {
        console.log("No tasks in the list.");
        return;
    }
    console.log("To-Do List:");
    for (let i = 0; i < tasks.length; i++) {
        console.log(`${i + 1}. ${tasks[i]}`);
    }
}

function filterPendingTasks() {
    let pending = tasks.filter(task => !task.includes("(done)"));
    if (pending.length === 0) {
        console.log("No pending tasks.");
        return;
    }
    console.log("Pending Tasks:");
    pending.forEach((task, index) => console.log(`${index + 1}. ${task}`));
}

function markTaskDone(index) {
    if (index >= 0 && index < tasks.length) {
        tasks[index] += " (done)";
        console.log(`Task "${tasks[index]}" marked as done.`);
    } else {
        console.log("Invalid index.");
    }
}

// Interactive console menu
function showMenu() {
    console.log("\nTo-Do List Menu:");
    console.log("1. Add Task");
    console.log("2. Remove Task");
    console.log("3. List All Tasks");
    console.log("4. Show Pending Tasks");
    console.log("5. Mark Task as Done");
    console.log("6. Exit");
}

// Simulated interactive loop (for demonstration)
let isRunning = true;
while (isRunning) {
    showMenu();
    let choice = prompt("Enter your choice (1-6):");
    
    switch (choice) {
        case "1":
            let task = prompt("Enter task description:");
            addTask(task);
            break;
        case "2":
            let indexToRemove = parseInt(prompt("Enter task index to remove:")) - 1;
            removeTask(indexToRemove);
            break;
        case "3":
            listTasks();
            break;
        case "4":
            filterPendingTasks();
            break;
        case "5":
            let indexToMark = parseInt(prompt("Enter task index to mark as done:")) - 1;
            markTaskDone(indexToMark);
            break;
        case "6":
            console.log("Exiting To-Do List.");
            isRunning = false;
            break;
        default:
            console.log("Invalid choice. Please select 1-6.");
    }
}