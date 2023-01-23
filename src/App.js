import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import AppList from './AppList';
import Home from './Home';
import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap';

const App = () => {

  return (
    <div className="App">
      
      <Router>

      <Navbar bg="secondary" variant="dark">
        <Container fluid>
          <NavbarBrand><Link to={'/home'}>Elanco App</Link></NavbarBrand>
          <Nav className="me-auto">
            <Link to={'/home'} style={{marginRight: 10, color:'white'}}>Home</Link>
            <Link to={'/applications'} style={{marginRight: 10, color:'white'}}>Applications</Link>
            <Link to={'/resources'} style={{color:'white'}}>Resources</Link>
          </Nav>
        </Container>
      </Navbar>
        <Routes>
          <Route path='/' element={<Navigate to={'/home'} replace />} />
          <Route path='/home' element={<Home />} />
          <Route path='/applications' element={<AppList componentName={'Applications List'}/>} />
          <Route path='/resources' element={<AppList componentName={'Resource List'} />} />
        </Routes>
      </Router>

    </div>

  )

}

export default App;
