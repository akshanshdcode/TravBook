import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ThankYou from '../pages/ThankYou'
import Home from './../pages/Home'
import Login from './../pages/Login'
import Register from './../pages/Register'
import SearchResultList from './../pages/SearchResultList'
import TourDetails from './../pages/TourDetails'
import Tours from './../pages/Tours'
import MyExpense from '../pages/MyExpense'
import CreateTourForm from '../pages/CreateTourForm'
import Bookings from '../pages/Bookings'
import Profile from '../pages/Profile'
import TripDetails from '../pages/TripDetails'

const Routers = () => {
   return (
      <Routes>
         <Route path='/' element={<Navigate to='/home'/>} />
         <Route path='/home' element={<Home/>} />
         <Route path='/tours' element={<Tours/>} />
         <Route path='/tours/:id' element={<TourDetails/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/register' element={<Register/>} />
         <Route path='/thank-you' element={<ThankYou/>} />
         <Route path='/tours/search' element={<SearchResultList/>} />
         <Route path='/myexpense' element={<MyExpense/>} />
         <Route path='/createtour' element={<CreateTourForm/>} />
         <Route path='/bookings' element={<Bookings/>} />
         <Route path='/profile' element={<Profile/>}/>
         <Route path='/trip/:id' element={<TripDetails/>} />
      </Routes>
   )
}

export default Routers