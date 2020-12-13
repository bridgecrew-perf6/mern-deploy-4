const Project = require('../models/project.model')

class ProjectController {

    getAll(req, res){
        Project.find({})
        .then( projects => res.json(projects))
        .catch(err => res.json(err));

    }

    getOne(req, res){
        Project.findOne({_id: req.params._id})
        .then(project => res.json(project))
        .catch(err => res.json(err));

    }

    create(req, res){
        Project.create(req.body)
        .then(project => res.json(project))
        .catch(err => res.json(err));

    }


    update(req, res) {
        Project.findOneAndUpdate({_id: req.params._id}, req.body, {runValidators: true})
        .then(() => res.json({msg: "ok"}))
        .catch(err => res.json(err));
    }


    remove(req, res){
        Project.deleteOne({_id: req.params._id})
        .then(() => res.json({msg: "ok"}))
        .catch(err => res.json(err));

    }
}

module.exports = new ProjectController();