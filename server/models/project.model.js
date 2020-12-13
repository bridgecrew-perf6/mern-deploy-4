const mongoose = require('mongoose');


const ProjectSchema = new mongoose.Schema({

    project: {
        type: String,
        required: [true, 'Project is required.'],
        minLength: [3, 'Project must be 3 characters or longer'],
    },

    duedate: {
        type: Date,
        required: [true],
        unique: [true]
    },

    status: {
        type: String,
        default: "backlog"
    }
}, {timestamps: true})

module.exports = mongoose.model('Project', ProjectSchema);
