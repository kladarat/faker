const request = require('request')
const faker = require('faker')
const async = require('async')

const url = 'http://localhost:3000/users'
const user =[]
const q = async.queue((task, callback) => {
    request.post(url).form({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email()
    })
    callback()
},1)
    
q.drain = () => {
    console.log('all complete')
}

for(i = 0; i < 100; i++){
    user.push(q)
}

q.push(user)