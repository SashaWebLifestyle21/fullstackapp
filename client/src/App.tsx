import React, {useEffect} from 'react';
import { Navigate, Route, Routes} from 'react-router-dom';
import Layout from './components/common-components/Layout/Layout';
import Start from './pages/user/Start';
import Home from "./pages/user/Home";
import { getMe } from "./redux/reducers/user/userSlice";
import { useAppDispatch, useAppSelectors } from "./hooks/redux";
import RequireAuth from "./hoc/RequireAuth";
import CardShop from "./containers/CardShop/CardShop";
import Wishlist from "./pages/user/Wishlist";
import Cart from "./pages/user/Cart";
import Admin from "./pages/admin/Admin";
import AddManage from './pages/admin/AddManage';
import Manage from './pages/manage/Manage';
import CreateCar from './pages/manage/CreateCar';
import Orders from "./pages/manage/Orders";
import ListCar from './pages/manage/ListCar';
import EditPage from "./pages/manage/EditPage";
import EditCar from "./containers/EditCar";
import Comment from "./pages/user/Comment";
import ItemComment from "./components/common-components/ItemComment";
import {getAllManagers} from "./redux/reducers/Manager/managerSlice";

function App() {
    const dispatch = useAppDispatch()
    const { cars } = useAppSelectors(state => state.carReducer)
    const { managers } = useAppSelectors(state => state.managerReducer)

    useEffect(() => {
        dispatch(getMe())
        dispatch(getAllManagers())
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
              <Route path='edit/*'>
                  {cars && cars.map(car => {
                      return (
                          <Route key={car.brand + car.model} path={car._id} element={
                              <RequireAuth>
                                  <EditCar card={car} />
                              </RequireAuth>
                          } />)
                  })}
              </Route>
              <Route path='/editPage' element={
                  <RequireAuth>
                      <EditPage />
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

              <Route path='comment/*'>
                  {managers && managers.map(manager => {
                      return (
                          <Route key={manager._id} path={manager._id} element={
                              <RequireAuth>
                                  <ItemComment manager={manager} />
                              </RequireAuth>
                          } />)
                  })}
              </Route>
              <Route path='/comment' element={
                  <RequireAuth>
                      <Comment managers={managers}/>
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
              <Route path='/listCar' element={
                  <RequireAuth>
                        <ListCar />
                  </RequireAuth>
              } />
              <Route path='/orders' element={
                  <RequireAuth>
                      <Orders />
                  </RequireAuth>
              } />
          </Route>
      </Routes>
  );
}

export default App;
