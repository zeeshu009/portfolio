// Console-based To-Do List
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tasks = [];

function showMenu() {
    console.log("\nTo-Do List:");
    console.log("1. Add Task");
    console.log("2. List Tasks");
    console.log("3. Remove Task");
    console.log("4. Exit");
}

function addTask(task) {
    tasks.push(task);
    console.log(`Task "${task}" added.`);
}

function listTasks() {
    if (tasks.length === 0) {
        console.log("No tasks.");
        return;
    }
    console.log("Tasks:");
    for (let i = 0; i < tasks.length; i++) {
        console.log(`${i + 1}. ${tasks[i]}`);
    }
}

function removeTask(index) {
    if (index >= 0 && index < tasks.length) {
        let removed = tasks.splice(index, 1);
        console.log(`Task "${removed[0]}" removed.`);
    } else {
        console.log("Invalid index.");
    }
}

// Main loop for user input
function mainLoop() {
    showMenu();
    rl.question("Enter choice (1-4): ", (choice) => {
        switch (choice) {
            case "1":
                rl.question("Enter task: ", (task) => {
                    addTask(task);
                    mainLoop();
                });
                break;
            case "2":
                listTasks();
                mainLoop();
                break;
            case "3":
                rl.question("Enter task index to remove: ", (index) => {
                    removeTask(parseInt(index) - 1);
                    mainLoop();
                });
                break;
            case "4":
                console.log("Exiting.");
                rl.close();
                break;
            default:
                console.log("Invalid choice. Choose 1-4.");
                mainLoop();
        }
    });
}

// Start the program
mainLoop();

// Handle readline close
rl.on('close', () => {
    process.exit(0);
});