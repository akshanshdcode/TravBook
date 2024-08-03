import React, { useState, useContext } from 'react';
import '../styles/create-tour.css'
import { BASE_URL } from '../utils/config'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const CreateTourForm = () => {

  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const [tour, setTour] = useState({
    title: '',
    city: '',
    address: '',
    distance: '',
    photo: '',
    desc: '',
    price: '',
    maxGroupSize: '',
    featured: '',
    providerId: user._id,
    providerName: user.username,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTour({
      ...tour,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(tour)
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/create/${user._id}`, {
        method: 'post',
            headers: {
               'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(tour)
      });
         const result = await res.json()
        alert(result.message)
        navigate('/profile')
         if(!res.ok) {
            return alert(result.message)
         }
      } catch (error) {
         alert(error.message)
      }  
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
  <div className="row">
    <div className="col">
      Title:
      <input type="text" name="title" placeholder="Title" value={tour.title} onChange={handleChange} required />
    </div>
    <div className="col">
      City:
      <input type="text" name="city" placeholder="City" value={tour.city} onChange={handleChange} required />
    </div>
  </div>
  <div className="row">
    <div className="col">
      Address:
      <input type="text" name="address" placeholder="Address" value={tour.address} onChange={handleChange} required />
    </div>
    <div className="col">
      Distance:
      <input type="number" name="distance" placeholder="Distance" value={tour.distance} onChange={handleChange} required />
    </div>
  </div>
  <input type="text" name="photo" placeholder="Photo URL" value={tour.photo} onChange={handleChange} required />
  <textarea name="desc" placeholder="Description" value={tour.desc} onChange={handleChange} required />
  <div className="row">
    <div className="col">
      Price:
      <input type="number" name="price" placeholder="Price" value={tour.price} onChange={handleChange} required />
    </div>
    <div className="col">
      Max Group Size:
      <input type="number" name="maxGroupSize" placeholder="Max Group Size" value={tour.maxGroupSize} onChange={handleChange} required />
    </div>
  </div>
  <button type="submit">Create Tour Package</button>
</form>

  );
};

export default CreateTourForm;
