import './App.css';
import Dashboard from './layouts/Dashboard';
import 'semantic-ui-css/semantic.min.css';
import Navi from './layouts/Navbar/Navi.jsx';
import { Container } from 'semantic-ui-react';
import Footer from './layouts/Footer'

function App() {
  return (
    <div className="App">
      <Navi/>
      <Container className="main">
        <Dashboard/> 
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
