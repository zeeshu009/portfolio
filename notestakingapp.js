const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const NOTES_FILE = 'notes.json';


function initializeNotesFile() {
    if (!fs.existsSync(NOTES_FILE)) {
        fs.writeFileSync(NOTES_FILE, JSON.stringify([]));
    }
}


function readNotes() {
    try {
        const data = fs.readFileSync(NOTES_FILE);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading notes:', error.message);
        return [];
    }
}


function saveNotes(notes) {
    try {
        fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
        console.log('Note saved successfully!');
    } catch (error) {
        console.error('Error saving note:', error.message);
    }
}


function addNote(content) {
    const notes = readNotes();
    const newNote = {
        id: notes.length + 1,
        content: content,
        timestamp: new Date().toISOString()
    };
    notes.push(newNote);
    saveNotes(notes);
}


function listNotes() {
    const notes = readNotes();
    if (notes.length === 0) {
        console.log('No notes found.');
        return;
    }
    console.log('\nYour Notes:');
    notes.forEach(note => {
        console.log(`[${note.id}] ${note.content} (${note.timestamp})`);
    });
}


function startApp() {
    initializeNotesFile();
    
    console.log('Welcome to Note Taker!');
    console.log('Commands: add <note>, list, exit');

    rl.on('line', (input) => {
        const [command, ...args] = input.trim().split(' ');
        
        switch (command.toLowerCase()) {
            case 'add':
                if (args.length > 0) {
                    addNote(args.join(' '));
                } else {
                    console.log('Please provide note content.');
                }
                break;
            case 'list':
                listNotes();
                break;
            case 'exit':
                console.log('Goodbye!');
                rl.close();
                break;
            default:
                console.log('Unknown command. Available commands: add, list, exit');
        }
    });
}


module.exports = {
    addNote,
    listNotes,
    readNotes,
    saveNotes
};


if (require.main === module) {
    startApp();
}