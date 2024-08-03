import Trip from '../models/Trip.js'

// Get all trips for a specific user
export const getTrips = async (req, res) => {
    const userId = req.params.userId;
    try {
      const trips = await Trip.find({ userId });
      res.status(200).json(trips);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch trips' });
    }
  };
//Getsingle Trip
export const getSingleTrip = async (req, res) => {
  const id = req.params.id

  try {
     const trip = await Trip.findById(id);

     res.status(200).json({ success: true, message: 'Successfully', data: trip })
  } catch (error) {
     res.status(404).json({ success: false, message: 'Not Found' })
  }
}
  
  // Add a new trip for a specific user
export const addTrip = async (req, res) => {
    const { tourName, date } = req.body;
    const { userId } = req.params;
    
    try {
      const newTrip = new Trip({ userId, tourName, date });
      await newTrip.save();
      res.status(201).json({ tripId: newTrip._id ,message: 'Trip Added'});
    } catch (error) {
      res.status(500).json({ message: 'Failed to add trip' });
    }
  };