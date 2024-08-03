import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const { tourId } = req.params; // Destructure tourId from req.params
  const newReview = new Review({ ...req.body });

  try {
    const savedReview = await newReview.save();

    // After creating a new review, update the reviews array of the tour
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id }
    });

    res.status(200).json({
      success: true,
      message: "Review submitted successfully",
      data: savedReview
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to submit review",
      error: error.message
    });
  }
};