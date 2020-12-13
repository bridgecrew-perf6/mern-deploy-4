import React, { useState } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';

const NewProject = () => {

    const [project, setProject] = useState("");
    const [duedate, setDuedate] = useState();
    const [errors, setErrors] = useState({});

    const add = e => {
        e.preventDefault();
        const p = {project, duedate};
        axios.post("http://localhost:8000/api/project", p)
        .then(res => {
            console.log(res);
            if(res.data.errors) {
            setErrors(res.data.errors);
            } else {
            navigate("/");
            }
        }).catch(err => {
            console.error(err);
        });
    } 

    const [error, setError] = useState({}); 

    const Validator = (e) => {
        let value = e.target.value.length;
        let message = "";
        let name = e.target.name;
        if(!value) {
        setError({...error,
            [name]: `${e.target.name} required!`
        });}

        else if(value < 3) {
            
            message = `${e.target.name}  must be at least 3 characters or longer`
        
        setError({...error,
            [name]: message
        });}
        else {
            setError({
                ...error,
                [name]: message
            })
        }
        
}

    return (
        <div className="row my-5">
            <div className="col-sm-8 offset-sm-2">
            {/* <Link to='/' className="btn btn-link mb-3">Back to Dashboard</Link> */}
                <div className="card">
                <div className="card-header bg-dark text-light">Plan a New Project</div>
                    <div className="card-body">
                        <form onSubmit={add}>
                            <div className="form-group">
                                <label>Project:</label>
                                <input type="text" className="form-control" name="project" value={project} onChange={e => setProject(e.target.value)}  onKeyUp={Validator}/>
                                <p className="text-danger">{errors.project ? errors.project.message: ''}</p>
                                <p className="text-danger">{error.project}</p> 
                            </div>
                            <div className="form-group">
                                <label>Due Date:</label>
                                <input type='date' name="duedate" className="form-control" value={duedate} onChange={e => setDuedate(e.target.value)}  />
                                <p className="text-danger">{errors.duedate ? errors.duedate.message: ''}</p>
                            </div>
                            <input type="submit" value="Plan Project" className="btn btn-info btn-block" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
    }

export default NewProject;