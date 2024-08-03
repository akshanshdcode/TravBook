import React, { useState, useEffect, useContext } from 'react';
import '../styles/expense-tracker.css'
import '../shared/tour-card.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const MyExpense = () => {

  const navigate = useNavigate()

  const TripCard = ({ trip }) => {
    return (
      <div style={{ backgroundColor: '#faa935' }} className="card">
        <div style={{display: 'flex', justifyContent: 'space-between'}} className="card-body">
          <div>
          <h5 className="card-title">{trip.tourName}</h5>
          <p className="card-title">Date: {new Date(trip.date).toLocaleDateString()}</p>
          </div>
          <Link to={`/trip/${trip._id}`}>
          <button className='expense__btn'>View Expenses</button>
          </Link>
        </div>
      </div>
    );
  };

  const today = new Date().toISOString().split('T')[0];

  const { user } = useContext(AuthContext)

  const [trips, setTrips] = useState(null);
  const [newTrip, setNewTrip] = useState({
    userId: user && user._id, tourName: '', date: today,
  });

  useEffect(() => {
    if(user){
      fetchTrips();
    }
  }, [user]);

  const fetchTrips = async () => {
    
    try {
      const response = await fetch(`${BASE_URL}/trips/${user?._id}`);
      const data = await response.json();
      setTrips(data.reverse());
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    }
  };

  const addTrip = async (e) => {
    e.preventDefault();
    try {
       const response = await fetch(`${BASE_URL}/trips/${user?._id}`, {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(newTrip),
       });
       const data = await response.json();
       alert("Trip Added")
        setNewTrip({ ...newTrip, tourName: '' });
        fetchTrips();
        
       if(!response.ok) {
          return alert(data.message)
       }
       return data.tripId;
    } catch (error) {
       alert(error.message)
       console.error('Failed to add trip:', error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTrip({ ...newTrip, [name]: value });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Expense Tracker</h1>
      <form onSubmit={addTrip}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Trip Name:</label>
          <input type="text" className="form-control" id="tourName" name="tourName" value={newTrip.tourName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date:</label>
          <input type="date" className="form-control" id="date" name="date" value={newTrip.date} onChange={handleChange}  required/>
        </div>
        <button style={{backgroundColor: '#faa935', color: '#000', border: 'none'}} type="submit" className="btn btn-primary">Add Trip</button>
      </form>
      <div>
        <h3 className="mt-5 mb-3">Trips:</h3>
          {trips && trips.map((trip, index) => (
            <div style={{marginTop: '10px'}} className="col" key={index}>
              <TripCard trip={trip} />
            </div>
          ))}
        </div>
        </div>
  )
}

export default MyExpense;