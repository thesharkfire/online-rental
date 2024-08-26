
import './App.css';
import{BrowserRouter, Routes, Route} from 'react-router-dom'
//Imported Pages
import Home from './pages/Home';
import Signup from './pages/Signup';
import AdminSignUp from './pages/AdminSignUp';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import SearchBar from './pages/SearchBar';
//import NewHome from './pages/NewHome';
import ProductPage from './components/ProductPage';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import Results from './pages/Results';
import AdminDashboard from './admin/AdminDashboard';
import { useEffect } from 'react';
import { login } from './redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';


function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.user?.role);


  useEffect(() => {
    //<Route path = '/newhome' element={<NewHome/>}> </Route>
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
          <Route path = '/signup/admin' element = {<AdminSignUp/>} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/searchbar' element = {<SearchBar />} />
          <Route path = '/products/:productId' element ={<ProductPage/>}> </Route>
          
          <Route path = '/orders' element={<Orders/>}> </Route>
          <Route path = '/cart' element={<Cart/>}> </Route>
          <Route path = '/results' element={<Results />}> </Route>
          <Route path="/admin" element={<AdminDashboard />}></Route>



        </Routes>

      </BrowserRouter>


    </div>
  );
}
/*

{role === 'admin' && (
  <Route path="/admin" element={<AdminDashboard />}></Route>
)}


*/
export default App;
