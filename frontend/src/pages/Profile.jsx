import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext.js'
import '../styles/profile.css'
import { BASE_URL } from '../utils/config.js'
import TourCard from '../shared/TourCard.jsx'
import '../shared/tour-card.css'

const Profile = () => {
  const { user } = useContext(AuthContext);

  const BookingCard = ({ booking }) => {
    return (
      <div style={{ backgroundColor: '#faa935' }} className="card">
        <div className="card-body">
          <h5 className="card-title">{booking.tourName}</h5>
          <p className="card-text">Guests: {booking.guestSize}</p>
          <p className="card-text">Date: {new Date(booking.bookAt).toLocaleDateString()}</p>
        </div>
      </div>
    );
  };


  const deleteTour = async (tour) => {
    try {
      const res = await fetch(`${BASE_URL}/delete/${tour._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await res.json();
      fetchTours();
      if (!res.ok) {
        return alert(result.message);
      }
      alert(result.message);
    } catch (error) {
      alert(error.message);
    }
  };

  const [bookings, setBookings] = useState(null);
  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${BASE_URL}/booking/${user?._id}`);
      const data = await response.json();
      setBookings(data.reverse());
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    }
  };

  const [tours, setTours] = useState(null);
  useEffect(() => {
    if (user) {
      fetchTours();
    }
  }, [user]);

  const fetchTours = async() => {
    try {
      const response = await fetch(`${BASE_URL}/tours/provider/${user?._id}`);
      const data = await response.json();
      setTours(data.reverse());
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    }
  };

  return (
    <div>
      <div className="container">
        <h2>User Profile</h2>
        <div className='whole-profile-info'>
          <div className="profile-info">
            <img src="https://api.multiavatar.com/kathrin.svg" alt="Profile Picture" />
            <div className='info'>
              <h1>{user.username}</h1>
              <h5>Email: {user.email}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
      {user && user.role === "user" && (
        <div>
        <h3 className="mt-5 mb-3">Your Bookings:</h3>
      
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {bookings && bookings.map((booking, index) => (
            <div className="col" key={index}>
              <BookingCard booking={booking} />
            </div>
          ))}
        </div>
        </div>
        )}
        {user && user.role === "provider" && (
        <div>
        <h3 className="mt-5 mb-3">Your Tours:</h3>
      
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {tours && tours.map((tour, index) => (
            <div className="col" key={index}>
              <TourCard tour={tour} />
              <button className=' booking__btn' onClick={() => deleteTour(tour)}>Delete</button>
            </div>
          ))}
        </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Profile;