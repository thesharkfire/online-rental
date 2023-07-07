
import './App.css';
import{BrowserRouter, Routes, Route} from 'react-router-dom'
//Imported Pages
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import SearchBar from './pages/SearchBar';
import { useEffect } from 'react';
import { login } from './redux/authSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

 
  useEffect(() => {
    //Turn this into check auth component
    // Load the authentication details from local storage when the component mounts
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
      dispatch(login(auth));
    }
  }, [dispatch]);

  

  return (

    <div className="App">

      
    
      <BrowserRouter>

        <Navbar />

        <Routes>

          <Route path = '/' element ={<Home/>}/>
          <Route path = '/signup' element = {<Signup/>} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/searchbar' element = {<SearchBar />} />
          

        </Routes>   

      </BrowserRouter>
      

    </div>
  );
}

export default App;
