const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chat-express', {
    useNewUrlParser: true
})
    .then(db => console.log('db is connected'))
    .catch(err => console.log(err));
