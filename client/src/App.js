import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Link } from '@reach/router';
import ListProjects from './Components/ListProjects';
import NewProject from './Components/NewProject';


function App() {
  return (
    <div className="App">
    <div className="container-fluid mt-1">
      <nav className='navbar navbar-expand-md navbar-light bg-dark justify-between '>
      <h3 className='display-5 mr-3 text-info'>Project Manager</h3>
      <ul className='navbar-nav'>
          <li className='navbar-brand'> <Link  className='text-light' to="/" >Dashboard</Link> </li>
          <li className='navbar-brand'> <Link to="/new" className="text-light">Add a New Project </Link>  </li>
      </ul>
      </nav>
      <Router>
        <ListProjects path= "/" />
        <NewProject path= "/new" />
      </Router>
  </div>
</div>
  );
}

export default App;
