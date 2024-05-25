import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import NavigationBar from './components/NavigationBar';
import Menus from './pages/Menus/Menus';
import MenuCreation from './pages/MenuCreation/MenuCreation';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/about" Component={About} />
        <Route path="/contact" Component={Contact} />
        <Route path="/menus" Component={Menus} />
        <Route path="/menu-creation" Component={MenuCreation} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
