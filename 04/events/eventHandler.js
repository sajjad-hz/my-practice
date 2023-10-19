const myEvent = require("./event");
require('./master')

myEvent.on('greeting', (message, name) => {
  console.log(message, name)
  myEvent.emit('res', 'aleyeke', message, name)
})

