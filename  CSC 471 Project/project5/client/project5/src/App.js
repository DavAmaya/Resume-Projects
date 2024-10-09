import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Employee from "./employee"
import NavBar from './navBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Routes} from 'react-router-dom';
import Managers from './Managers';
import Hourly from './hourly';
import Salaries from './salaries';


function App() {
  return (
    <>
    <div className='App1'>
    <Router>
      
        <h1 className='App'>Project 5</h1>
        <NavBar></NavBar>
        
        <Routes>
        <Route exact path='/' Component={Employee}>
        </Route>
        <Route path='/Employee' Component={Employee}>
        </Route>
        <Route path='/Managers' Component={Managers}>
        </Route>
        <Route path='/Salaries' Component={Salaries}>
        </Route>
        <Route path='/Hourly' Component={Hourly}>
        </Route>
        </Routes>
        
        
        </Router>  
        </div>
        </>
  );
}

export default App;
