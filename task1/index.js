/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
const basic = require('./basicFunctions');
const excel = require('./excelFunctions');
const add = require('./addFunctions');
const yargs = require('yargs');

const titleOptions = {
  describe: 'Title of note',
  demandOption: true,
  alias: 't'
};

const newTitleOptions = {
  describe: 'New title of note',
  demandOption: true,
  alias: 'nt'
};

const bodyOptions = {
  describe: 'Body of note',
  demandOption: true,
  alias: 'b'
};

const typeOptions = {
  describe: 'Type of sort',
  demandOption: true,
  alias: 'ty'
};

yargs.command('add', 'Add a new note',
  function (yargs) {
    return yargs.options({
      'title': titleOptions,
      'body': bodyOptions
    });
  },

  function (argv) {
    basic.addNote(argv);
  }
);

yargs.command('list', 'List all notes',

  function (argv) {
    basic.hasFileExist(argv);
    basic.listAllNotes(argv);
  }
);

yargs.command('read', 'Read a note',
  function (yargs) {
    return yargs.options({
      'title': titleOptions
    });
  },

  function (argv) {
    basic.hasFileExist(argv);
    basic.hasNoteExist(argv);
    basic.readNote(argv);
  }
);

yargs.command('remove', 'Remove a note',
  function (yargs) {
    return yargs.options({
      'title': titleOptions
    });
  },

  function (argv) {
    basic.hasFileExist(argv);
    basic.hasNoteExist(argv);
    basic.removeNote(argv);
  }
);

yargs.command('sort', 'Sort notes by types',
  function (yargs) {
    return yargs.options({
      'type': typeOptions
    });
  },

  function (argv) {
    basic.hasFileExist();
    add.sortNotes(argv);
  }
);

yargs.command('writeToExcel', 'Write to exel',
  function (yargs) {
    return yargs.options({
    });
  },

  function () {
    excel.writeToExcel();
  }
);

yargs.command('readFromExcel', 'Read from excel',
  function (yargs) {
    return yargs.options({
    });
  },

  function () {
    excel.readFromExcel();
  }
);

yargs.command('findAndUpdate', 'Find and update note',
  function (yargs) {
    return yargs.options({
      'title': titleOptions,
      'newTitle': newTitleOptions
    });
  },

  function (argv) {
    basic.hasFileExist(argv);
    excel.findAndUpdate(argv);
  }
)
  .help()
  .argv;
