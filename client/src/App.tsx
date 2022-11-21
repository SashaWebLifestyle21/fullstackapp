import React, {useEffect} from 'react';
import { Navigate, Route, Routes} from 'react-router-dom';
import Layout from './components/common-components/Layout/Layout';
import Start from './pages/user/Start';
import Home from "./pages/user/Home";
import { getMe } from "./redux/reducers/user/userSlice";
import {useAppDispatch, useAppSelectors} from "./hooks/redux";
import RequireAuth from "./hoc/RequireAuth";
import CardShop from "./containers/CardShop/CardShop";
import Wishlist from "./pages/user/Wishlist";
import Cart from "./pages/user/Cart";
import Admin from "./pages/admin/Admin";
import AddManage from './pages/admin/AddManage';
import Manage from './pages/manage/Manage';
import CreateCar from './pages/manage/CreateCar';
import Buy from "./pages/user/Buy";

function App() {
    const dispatch = useAppDispatch()
    const { cars } = useAppSelectors(state => state.carReducer)

    useEffect(() => {
        dispatch(getMe())
    },[dispatch])
    
  return (

      <Routes>
          <Route element={<Layout />}>
              <Route path='/' element={<Start />} />
              <Route path='/home' element={
                  <RequireAuth>
                      <Home />
                  </RequireAuth>
              } />
              <Route path='/shop' element={<Navigate replace to='/home' />} />
              <Route path='shop/*'>
                  {cars && cars.map(car => {
                    return (
                        <Route key={car.model + car.brand} path={car.pathUrl} element={
                        <RequireAuth>
                            <CardShop card={car} />
                        </RequireAuth>
                    } />)
                  })}
              </Route>
              <Route path='/buy' element={
                  <RequireAuth>
                      <Buy />
                  </RequireAuth>
              } />
              <Route path='/wishlist' element={
                  <RequireAuth>
                      <Wishlist />
                  </RequireAuth>
              } />
              <Route path='/cart' element={
                  <RequireAuth>
                      <Cart />
                  </RequireAuth>
              } />
              <Route path='/admin' element={
                  <RequireAuth>
                      <Admin />
                  </RequireAuth>
              } />
              <Route path='/addManage' element={
                  <RequireAuth>
                      <AddManage />
                  </RequireAuth>
              } />
              <Route path='/manage' element={
                  <RequireAuth>
                      <Manage />
                  </RequireAuth>
              } />
              <Route path='/createCar' element={
                  <RequireAuth>
                      <CreateCar />
                  </RequireAuth>
              } />
          </Route>
      </Routes>
  );
}

export default App;
