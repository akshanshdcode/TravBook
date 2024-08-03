import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
import '../styles/expense-tracker.css'
import '../shared/tour-card.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "reactstrap";

const TripDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const today = new Date().toISOString().split('T')[0];

  const [expenses, setExpenses] = useState(null);
  const [newExpense, setNewExpense] = useState({
    userId: user && user._id, description: '', amount: 0, date: today, tripId: id,
  });

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);  // State for loading
  const [error, setError] = useState(null);  // State for error

  useEffect(() => {
    if (user) {
      fetchTrip();
    }
  }, [user]);

  const fetchTrip = async () => {
    try {
      const response = await fetch(`${BASE_URL}/trips/trip/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTrip(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);  // Set loading to false after fetch completes
    }
  };

  useEffect(() => {
    if(user){
      fetchExpenses();
    }
  }, [user]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${BASE_URL}/expense/${user?._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tripId: id }),
      });
      const data = await response.json();
      setExpenses(data.reverse());
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    }
  };

  const addExpense = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/expense/addExpense/${user?._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newExpense),
      });
      const data = await response.json();
      alert(data.message)
      if(!response.ok) {
        return alert(data.message)
      }
      setNewExpense({ ...newExpense, description: '', amount: 0 });
      fetchExpenses();
    } catch (error) {
      alert(error.message)
      console.error('Failed to add expense:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const totalAmount = expenses ? expenses.reduce((acc, curr) => acc + curr.amount, 0) : 0;

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {trip ? (
        <div>
        <div style={{margin: '20px', padding: '10px', backgroundColor: '#faa935', borderRadius: '10px'}}>
          <h2>{trip.tourName}</h2>
          <h6>Date: {new Date(trip.date).toLocaleDateString()}</h6>
        </div>
        <div >
            <h2 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Add Expense</h2>
        <form onSubmit={addExpense}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <input type="text" className="form-control" id="description" name="description" value={newExpense.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date:</label>
          <input type="date" className="form-control" id="date" name="date" value={newExpense.date} onChange={handleChange}  required/>
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount:</label>
          <input type="number" className="form-control" id="amount" name="amount" value={newExpense.amount} onChange={handleChange} required />
        </div>
        <button style={{backgroundColor: '#faa935', color: '#000', border: 'none'}} type="submit" className="btn btn-primary">Add Expense</button>
      </form>
        </div>
        <Container>
        <h3 className="mt-5">Expenses:</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount (Rupees)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses && expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.description}</td>
              <td>{expense.amount}/-</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="2"><strong>Total</strong></td>
            <td><strong>Rs.{totalAmount}/-</strong></td>
          </tr>
        </tbody>
      </table>
        </Container>
        </div>



      ) : (
        <p>No trip details available</p>
      )}
    </div>
  );
};

export default TripDetails;