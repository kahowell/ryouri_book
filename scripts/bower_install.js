process.chdir('www');
var bower = require('bower');
bower.commands.install([], {}, {cwd: 'www'});
