import React, {useEffect, useState} from 'react'
import axios from 'axios';
import moment from 'moment';


const ListProjects = ({status}) => {

    const [all, setAll] = useState([]);


    useEffect( () => {
        getAll();
    }, [status]);


    function Sort(all) {
        let arr = [...all];
            for(let i=0; i<arr.length; i++) {
                for(let j=0; j<arr.length-i-1; j++) {
                    if(arr[j].duedate < arr[j+1].duedate) {
                        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                    }
                }
            }
        return arr;
    }


    function getAll() {
        axios.get("http://localhost:8000/api/project")
        .then(res => {
            console.log(res);
            setAll(Sort(res.data));
        }).catch(err => console.error(err));
    }

    const remove = _id => {
    axios.delete(`http://localhost:8000/api/project/${_id}`)
    .then(res => {
        console.log(res);
        getAll();
    }).catch(err => console.error(err));
}

const clickHandler = ( id, val) => {
    if (val === "inprogress") {
        axios.put(`http://localhost:8000/api/project/${id}`, {status: "inprogress" })
            .then(res => {
                getAll();
            console.log(res.data)

            }).catch(err => console.log(err))
    } 
    else if (val === "completed") {
        axios.put(`http://localhost:8000/api/project/${id}`, {status: "completed" })
        .then(res => {
            getAll();
            console.log(res.data)
        }).catch(err => console.log(err))
    }
}

    return (
        <>
        <div className='row my-5'>
        <div className="col my-3 border ml-2">
            <h3 className='bg-info text-light  p-3'>Backlog</h3>
        {
        all.map( project => 
            <div className="" key={project._id}>
                <div className="card my-5">
                    <div className="card-header bg-dark text-light">{project.project}</div>
                    <div className="card-body">
                    <p className='card-text'>Due Date: {moment(project.duedate).format("YYYY/MM/DD")}</p>
                        <div className="d-flex justify-content-between">
                        <button  className="btn btn-warning btn-block" onClick={() => clickHandler(project._id,'inprogress')}>Start Project</button>
                        </div>
                    </div>
                </div>
            </div> 
            )
            }
        </div>
            <div className='col my-3 border ml-2'>
            <h3 className='bg-warning text-light  p-3 '>In Progress</h3> 
            {
            all.map( project => 
                <div className="" key={project._id}>
                    {project.status === 'inprogress' ?
                    <>
                    <div className="" key={project._id}>
                    <div className="card my-5">
                    <div className="card-header bg-dark text-light">{project.project}</div>
                    <div className="card-body">
                    <p className='card-text'>Due Date: {moment(project.duedate).format("YYYY/MM/DD")}</p>
                    <button  className="btn btn-success btn-block" onClick={() => clickHandler(project._id,'completed')}>Move to Complete</button>
                    </div>
                    </div>
                    </div>
                    </>
                    : ''
                }
                </div>
            )}
            </div>

            <div className='col my-3 border ml-2 '>
            <h3 className='bg-success text-light  p-3'>Completed</h3> 
            {
            all.map( project => 
                <div className=" " key={project._id}>
                    {project.status === 'completed' ?
                    <>
                    <div className="" key={project._id}>
                    <div className="card my-5">
                    <div className="card-header bg-dark text-light">{project.project}</div>
                    <div className="card-body">
                    <p className='card-text'>Due Date: {moment(project.duedate).format("YYYY/MM/DD")}</p>
                    <button className="btn btn-danger btn-block" onClick={() => remove(project._id)}>Remove Project</button>
                    </div>
                    </div>
                    </div>
                    </>
                    : ''
                }
                </div>
            )}
            </div>
            </div>
        </>
    )
    }

export default ListProjects;