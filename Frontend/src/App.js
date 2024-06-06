import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './Pages/Roles/Contributor/Dashboard';
import Homepage from './Pages/Home/Homepage';
import Category from './Pages/Category/Category';
import Product from './Pages/Product/Product';
import Wishlist from './Pages/Wishlist/Wishlist';
import Cart from './Pages/Cart/Cart';
import Upload from './Pages/Upload/Upload';
import Account from './Pages/Account/Account';
import Contributor from './Pages/Contributor/Contributor';
import { useDispatch } from 'react-redux';
import { setUser } from './state/reducers/userReducer';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users/getUser', { headers: { authorization: `Bearer ${Cookies.get('token')}` } })
        console.log(response.data.user)
        dispatch(setUser(response.data.user))
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="App font-mullish">
      <Routes>
        <Route element={<Homepage />} path=''></Route>
        <Route element={<Cart />} path='/cart'></Route>
        <Route element={<Wishlist />} path='/wishlist'></Route>
        {/* <Route element={<Dashboard />} path='/contributor'></Route> */}
        <Route element="" path='/admin'  ></Route>
        <Route element="" path='/customer'  ></Route>
        <Route element={<Login />} path='/login'  ></Route>
        <Route element={<Category />} path='/category/:category'  ></Route>
        <Route element={<Product />} path='/product'  ></Route>
        <Route element={<Register />} path='/register'  ></Route>
        <Route element={<Upload />} path='/upload'  ></Route>
        <Route element={<Account />} path='/account'  ></Route>
        <Route element={<Contributor />} path='/contributor'  ></Route>
      </Routes>
    </div>
  );
}

export default App;
