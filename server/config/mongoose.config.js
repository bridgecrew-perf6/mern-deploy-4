const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/project_manager_db', {
    useUnifiedTopology: true,
    useNewUrlParser: true
    
}).then( () => console.log('Successfully Connected to project_manager_db'))
.catch(err => console.error(err));