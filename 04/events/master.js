const myEvent = require('./event')
require('./eventHandler')

setTimeout(() => {
    myEvent.emit('greeting', 'salam', 'Hamed')
}, 2000);

myEvent.on('res', (...args) => {
  console.log(args[0], args[1], args[2])
})