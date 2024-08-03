import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext.js'
import { BASE_URL } from '../utils/config.js';

const Bookings = () => {

    const { user } = useContext(AuthContext);

    const BookingCard = ({ booking }) => {
      return (
        <div style={{ backgroundColor: '#faa935' }} className="card">
          <div className="card-body">

            <h5 className="card-title">{booking.tourName}</h5>
            <p className="card-title">Booked by: {booking.fullName} | Email: {booking.userEmail}  |  Phone no: {booking.phone}</p>
            <p className="card-text">Guests: {booking.guestSize}</p>
            <p className="card-text">Booked for: {new Date(booking.bookAt).toLocaleDateString()}</p>
          </div>
        </div>
      );
    };
    const BookingCardAdmin = ({ book }) => {
        return (
          <div style={{ backgroundColor: '#faa935' }} className="card">
            <div className="card-body">
              <h5 className="card-title">{book.tourName}</h5>
              <p className="card-title">Booked by: {book.fullName} | Email: {book.userEmail} | Phone no: {book.phone}</p>
              <p className="card-title">Provider Id: {book.providerId}</p>
              <p className="card-text">Guests: {book.guestSize}</p>
              <p className="card-text">Booked for: {new Date(book.bookAt).toLocaleDateString()}</p>
            </div>
          </div>
        );
      };

    const [bookings, setBookings] = useState(null);
    useEffect(() => {
      if (user) {
        fetchBookings();
      }
    }, [user]);
  
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/booking/provider/${user?._id}`);
        const data = await response.json();
        setBookings(data.reverse());
      } catch (error) {
        console.error('Failed to fetch Bookings:', error);
      }
    };

    const [Allbookings, setAllBookings] = useState(null);
    useEffect(() => {
      if (user) {
        fetchAllBookings();
      }
    }, [user]);
  
    const fetchAllBookings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/booking`);
        const result = await response.json();
        const data = result.data || [];
        setAllBookings(data.reverse());
      } catch (error) {
        console.error('Failed to fetch Bookings:', error);
      }
    };

  return (
      <div>
        <div className="container">

        

        {user && user.role == 'provider' && (
        <div>
        <h3 className="mt-5 mb-3">Bookings:</h3>
          {bookings && bookings.map((booking, index) => (
            <div style={{marginTop: '10px'}} className="col" key={index}>
              <BookingCard booking={booking} />
            </div>
            
          ))}
        </div>
        )}
        {user && user.role == 'admin' && (
        <div>
        <h3 className="mt-5 mb-3">All Bookings:</h3>
          {Allbookings && Allbookings.map((book, index) => (
            <div style={{marginTop: '10px'}} className="col" key={index}>
              <BookingCardAdmin book={book} />
            </div>
            
          ))}
        </div>
        )}
        </div>
        </div>
  )
}

export default Bookings
