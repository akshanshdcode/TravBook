import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'

const Testimonials = () => {
   const settings = {
      dots:true,
      infinite:true,
      autoplay:true,
      speed:1000,
      swipeToSlide:true,
      autoplaySpeed:2000,
      slidesToShow:3,

      responsive: [
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               infinite: true,
               dots: true,
            },
            breakpoint: 576,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               infinite: true,
               dots: true,
            },
         }
      ]
   }

   return <Slider {...settings}>
      <div className="testimonial py-4 px-3">
         <p>Planning your next adventure is a breeze with this travel booking website! The intuitive interface makes it easy to find and book the ideal travel package for your needs. With personalized recommendations tailored to your preferences, you'll find great deals on packages that suit your style. Say goodbye to stress and hello to seamless travel planning!
         </p>

         <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava01} className='w-25 h-25 rounded-2' alt="" />
            <div>
               <h6 className='mb-0 mt-3'>Chirag Patil</h6>
               <p>Customer</p>
            </div>
         </div> 
      </div>

      <div className="testimonial py-4 px-3">
         <p>I absolutely love using this travel booking website for all my travel package needs! The interface is so easy to use, and I always find amazing deals on packages that suit my preferences perfectly. The personalized recommendations are a fantastic feature that sets this website apart. If you're looking for a stress-free way to plan your next getaway, this is the site for you!
         </p>

         <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava02} className='w-25 h-25 rounded-2' alt="" />
            <div>
               <h6 className='mb-0 mt-3'>Bhishek Parmar</h6>
               <p>Customer</p>
            </div>
         </div> 
      </div>

      <div className="testimonial py-4 px-3">
         <p>This travel booking website is my go-to for booking travel packages! The website is user-friendly, and I always find great deals on packages that fit my budget and preferences. The personalized recommendations are a great touch and make planning my trips so much easier. I highly recommend this website to anyone looking for a seamless travel booking experience!
         </p>

         <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava03} className='w-25 h-25 rounded-2' alt="" />
            <div>
               <h6 className='mb-0 mt-3'>Arpit Jaiswal</h6>
               <p>Customer</p>
            </div>
         </div> 
      </div>

      <div className="testimonial py-4 px-3">
         <p>I can't recommend this travel booking website enough for booking travel packages! The website is easy to navigate, and I love how it suggests personalized travel packages based on my interests. The deals are unbeatable, and I always find exactly what I'm looking for. If you want to simplify your travel package booking experience, look no further than this website!
         </p>

         <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava03} className='w-25 h-25 rounded-2' alt="" />
            <div>
               <h6 className='mb-0 mt-3'>Ashwin Gorle</h6>
               <p>Customer</p>
            </div>
         </div> 
      </div>
   </Slider>
}

export default Testimonials