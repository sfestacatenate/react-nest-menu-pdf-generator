import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import NavigationBar from './components/NavigationBar';
import Menus from './pages/Menus/Menus';
import MenuCreation from './pages/MenuCreation/MenuCreation';
import MenuEdit from './pages/MenuEdit/MenuEdit';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/menus" Component={Menus} />
        <Route path="/menu-creation" Component={MenuCreation} />
        <Route path="/menu-edit/:id" Component={MenuEdit} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
