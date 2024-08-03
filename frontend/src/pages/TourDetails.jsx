import React, { useState, useRef, useEffect, useContext } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
import '../shared/tour-card.css';

const TourDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
  const [reviews, setReviews] = useState([]);

  const {
    photo,
    title,
    desc,
    price,
    city,
    address,
    distance,
    maxGroupSize,
    providerName,
  } = tour || {};

  const { avgRating } = calculateAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!user) {
      return alert("Please sign in");
    }
    if (!tourRating) {
      return alert("Please select a rating");
    }

    const reviewObj = {
      username: user?.username,
      reviewText,
      rating: tourRating,
    };

    try {
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      // Update the reviews state to include the new review
      setReviews((prevReviews) => [...prevReviews, reviewObj]);
      alert(result.message);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteTour = async () => {
    try {
      const res = await fetch(`${BASE_URL}/tours/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      alert(result.message);
      navigate("/tours");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  useEffect(() => {
    if (tour && tour.reviews) {
      setReviews(tour.reviews);
    }
  }, [tour]);

  return (
    <section>
      <Container>
        {loading && <h4 className="text-center pt-5">LOADING.........</h4>}
        {error && <h4 className="text-center pt-5">{error}</h4>}
        {!loading && !error && (
          <>
            {!user && navigate("/login")}
            {user && user.role !== "user" && (
              <div className="tour__content">
                <img src={photo} alt="" />

                <div className="tour__info">
                  <h2>{title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i
                        className="ri-star-fill"
                        style={{ color: "var(--secondary-color)" }}
                      ></i>{" "}
                      {avgRating === 0 ? null : avgRating}
                      {avgRating === 0 ? (
                        "Not rated"
                      ) : (
                        <span>({reviews?.length})</span>
                      )}
                    </span>

                    <span>
                      <i className="ri-map-pin-fill"></i> {address}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span>
                      <i className="ri-map-pin-2-line"></i> {city}
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-line"></i> {price}/ per person
                    </span>
                    <span>
                      <i className="ri-map-pin-time-line"></i> {distance} k/m
                    </span>
                    <span>
                      <i className="ri-group-line"></i> {maxGroupSize} people
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
                  {user && user.role === "admin" && (
                    <div style={{ margin: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
                      {/* can add edit tour here */}
                      <button style={{ margin: '4px' }} className="booking__btn" onClick={deleteTour}>Delete Tour</button>
                    </div>
                  )}
                </div>

                <div className="tour__reviews mt-4">
                  <h4>Reviews ({reviews?.length} reviews)</h4>

                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      <span onClick={() => setTourRating(1)}>
                        1 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(2)}>
                        2 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(3)}>
                        3 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(4)}>
                        4 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(5)}>
                        5 <i className="ri-star-s-fill"></i>
                      </span>
                    </div>
                  </Form>

                  <ListGroup className="user__reviews">
                    {reviews?.map((review) => (
                      <div className="review__item" key={review._id}>
                        <img src={avatar} alt="" />

                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username}</h5>
                              <p>
                                {new Date(review.createdAt).toLocaleDateString("en-US", options)}
                              </p>
                            </div>

                            <span className="d-flex align-items-center">
                              {review.rating}
                              <i className="ri-star-s-fill"></i>
                            </span>
                          </div>

                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            )}

            {user && user.role === "user" && tour && (
              <Row>
                <Col lg="8">
                  <div className="tour__content">
                    <img src={photo} alt="" />

                    <div className="tour__info">
                      <h2>{title}</h2>
                      <div className="d-flex align-items-center gap-5">
                        <span className="tour__rating d-flex align-items-center gap-1">
                          <i
                            className="ri-star-fill"
                            style={{ color: "var(--secondary-color)" }}
                          ></i>{" "}
                          {avgRating === 0 ? null : avgRating}
                          {avgRating === 0 ? (
                            "Not rated"
                          ) : (
                            <span>({reviews?.length})</span>
                          )}
                        </span>

                        <span>
                          <i className="ri-map-pin-fill"></i> {address}
                        </span>
                      </div>

                      <div className="tour__extra-details">
                        <span>
                          <i className="ri-map-pin-2-line"></i> {city}
                        </span>
                        <span>
                          <i className="ri-money-dollar-circle-line"></i> {price}/ per person
                        </span>
                        <span>
                          <i className="ri-map-pin-time-line"></i> {distance} k/m
                        </span>
                        <span>
                          <i className="ri-group-line"></i> {maxGroupSize} people
                        </span>
                        
                      </div>
                      <h5>
                          Provider: {providerName}
                      </h5>
                      <h5>Description</h5>
                      <p>{desc}</p>
                    </div>

                    <div className="tour__reviews mt-4">
                      <h4>Reviews ({reviews?.length} reviews)</h4>

                      <Form onSubmit={submitHandler}>
                        <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                          <span onClick={() => setTourRating(1)}>
                            1 <i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setTourRating(2)}>
                            2 <i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setTourRating(3)}>
                            3 <i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setTourRating(4)}>
                            4 <i className="ri-star-s-fill"></i>
                          </span>
                          <span onClick={() => setTourRating(5)}>
                            5 <i className="ri-star-s-fill"></i>
                          </span>
                        </div>

                        <div className="review__input">
                          <input
                            type="text"
                            ref={reviewMsgRef}
                            placeholder="share your thoughts"
                            required
                          />
                          <button
                            className="btn primary__btn text-white"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </Form>

                      <ListGroup className="user__reviews">
                        {reviews?.map((review) => (
                          <div className="review__item" key={review._id}>
                            <img src={avatar} alt="" />

                            <div className="w-100">
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <h5>{review.username}</h5>
                                  <p>
                                    {new Date(review.createdAt).toLocaleDateString("en-US", options)}
                                  </p>
                                </div>

                                <span className="d-flex align-items-center">
                                  {review.rating}
                                  <i className="ri-star-s-fill"></i>
                                </span>
                              </div>

                              <h6>{review.reviewText}</h6>
                            </div>
                          </div>
                        ))}
                      </ListGroup>
                    </div>
                  </div>
                </Col>

                <Col lg="4">
                  <Booking tour={tour} avgRating={avgRating} />
                </Col>
              </Row>
            )}
          </>
        )}
      </Container>
      <Newsletter />
    </section>
  );
};

export default TourDetails;