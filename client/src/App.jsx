import { Routes,Route, useLocation } from 'react-router-dom';
import { Home, Landing, Form, Detail } from './views/index.js';
import NavBar from './components/NavBar/NavBar.jsx';



function App() {
  const location = useLocation();

  return (
    <div >
       {location.pathname !== '/' && <NavBar/>}
       <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
       </Routes>   
    </div>
  );
}

export default App;
