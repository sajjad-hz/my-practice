process.title = 'Node-Child'

const intID = setInterval(() => {
    process.stdout.write('salam')
}, 1000);

// setTimeout(() => {
//     clearInterval(intID)
// }, 5000);