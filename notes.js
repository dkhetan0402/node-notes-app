const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const note = {
        title: title,
        body: body
    };

    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if(!duplicateNote){
        console.log(chalk.bgGreen('Note added!'));
        notes.push(note);
        saveNotes(notes);
    }else{
        console.log(chalk.bgRed('Title already taken!'));
    }

}

const removeNote = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter((note) => note.title !== title);

    if(filteredNotes.length !== notes.length){
        console.log(chalk.bgGreen('Note removed: '+ title));
        saveNotes(filteredNotes);
    }else{
        console.log(chalk.bgRed('Note you are trying to remove does not exist!'));
    }
}

const saveNotes = (notes) => {
    const notesString = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesString);
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = JSON.parse(dataBuffer.toString());
        return dataJSON;    
    }catch(e){
        return [];
    }
    
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.bold.underline.yellow("---Your Notes---"));
    notes.forEach(note => console.log(note.title));
}

const readNote = (title) => {
    const notes = loadNotes();
    const noteToBeRead = notes.find((note) => note.title === title);
    if(noteToBeRead){
        console.log(chalk.bold.yellow.underline(noteToBeRead.title));
        console.log(noteToBeRead.body);
    }else{
        console.log(chalk.bgRed("Note you are trying to find is not available"));
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}