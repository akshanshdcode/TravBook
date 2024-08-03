import Tour from '../models/Tour.js'

//Create new tour
export const createTour = async (req, res) => {

   console.log(req.body);
   
   const {title  ,
      city,
      address,
      distance,
      photo,
      desc,
      price,
      maxGroupSize, providerId, providerName } = req.body;


  try {
   const newTour = new Tour({
      title ,
      city,
      address,
      distance : parseInt(distance),
      photo,
      desc,
      price : parseInt(price),
      maxGroupSize : parseInt(maxGroupSize), 
      providerId,
      providerName,
      });

      const savedTour = await newTour.save()

      res.status(200).json({ success: true, message: 'Tour Created Successfully', data: savedTour })
   } catch (error) {
      res.status(500).json({ success: true, message: 'Failed to create. Try again!' })
   }
}

export const getTourByProvider = async (req, res)=> {
   const providerId = req.params.id;

   try {
      const tours = await Tour.find({ providerId });

      res.status(200).json(tours);
   } catch (error) {
      res.status(404).json({ success: false, message: "Failed to fetch your tours" });
   }
}

//Update Tour
export const updateTour = async (req, res) => {
   const id = req.params.id

   try {
      const updatedTour = await Tour.findByIdAndUpdate(id, {
         $set: req.body
      }, { new: true })

      res.status(200).json({ success: true, message: 'Successfully updated', data: updatedTour })
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update' })
   }
}

//Delete Tour
export const deleteTour = async (req, res) => {
   const id = req.params.id

   try {
      await Tour.findByIdAndDelete(id)

      res.status(200).json({ success: true, message: 'Successfully deleted' })
   } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete' })
   }
}

//Getsingle Tour
export const getSingleTour = async (req, res) => {

   const id = req.params.id

   try {
      const tour = await Tour.findById(id).populate('reviews')

      res.status(200).json({ success: true, message: 'Successfully', data: tour })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}

//Get All Tour
export const getAllTour = async (req, res) => {

   //For pagination
   const page = parseInt(req.query.page)

   try {
      const tours = await Tour.find({}).populate('reviews').skip(page * 8).limit(8)

      res.status(200).json({ success: true, count: tours.length, message: 'Successfully', data: tours })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}


// Get tour by search
export const getTourBySearch = async (req, res) => {

   // hear 'i' means case sensitive 
   const city = new RegExp(req.query.city, 'i')
   const distance = parseInt(req.query.distance)
   const maxGroupSize = parseInt(req.query.maxGroupSize)

   try {
      // gte means greater than equal
      const tours = await Tour.find({ city, distance: { $gte: distance }, maxGroupSize: { $gte: maxGroupSize } }).populate('reviews')

      res.status(200).json({ success: true, message: 'Successfully', data: tours })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}

//Get featured Tour
export const getFeaturedTour = async (req, res) => {
   //console.log(page)

   try {
      const tours = await Tour.find({ featured: true }).populate('reviews').limit(8)

      res.status(200).json({ success: true, message: 'Successfully', data: tours })
   } catch (error) {
      res.status(404).json({ success: false, message: 'Not Found' })
   }
}

//Get tour count 
export const getTourCount = async(req,res) => {
   try {
      const tourCount = await Tour.estimatedDocumentCount()

      res.status(200).json({success:true, data:tourCount})
   } catch (error) {
      res.status(500).json({success:false, message: "Failed to fetch"})
   }
}