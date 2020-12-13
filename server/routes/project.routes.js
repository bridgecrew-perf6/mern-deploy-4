const Project = require('../controllers/project.controller');


module.exports = app => {
    app.get('/api/project', Project.getAll);
    app.get("/api/project/:_id", Project.getOne);
    app.post("/api/project", Project.create);
    app.put("/api/project/:_id", Project.update);
    app.delete("/api/project/:_id", Project.remove);
}