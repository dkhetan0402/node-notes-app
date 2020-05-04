const yargs = require('yargs');
const notes = require('./notes.js');
yargs.version('1.1.0');

//Create add command
yargs.command({
    command: 'add',
    describe: 'To add a new note',
    handler(argsv){
        notes.addNote(argsv.title, argsv.body);
    },
    builder:{
        title:{
            describe: 'Title of the note',
            demandOption : true,
            type: 'string'
        },
        body:{
            describe:'Actual note',
            type:'string',
            demandOption: true
        }
    }

});

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'To remove a note',
    handler(argsv){
        notes.removeNote(argsv.title);
    },
    builder: {
        title:{
            describe:'Title of the note',
            demandOption: true,
            type: 'string',
        }
    }
});

//Create list command to list all notes
yargs.command({
    command: 'list',
    describe: 'To list all notes',
    handler(){
        notes.listNotes();
    } 
});

//Create read command to update all notes
yargs.command({
    command: ['read','r','r1'],
    describe: 'Read a note',
    handler(argsv){
        notes.readNote(argsv.title);
    },
    builder:{
        title:{
            describe: "Title of the note to be read",
            demandOption: true,
            type: "string"
        }
    }
});

yargs.parse();