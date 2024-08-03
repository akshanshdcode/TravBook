import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'
import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
   {
      imgUrl: weatherImg,
      title: `Travel Packages`,
      desc: `Best Travel Packages are available on our websites.`,
   },
   {
      imgUrl: guideImg,
      title: `Best Tour Guide`,
      desc: `Provide you a your best tour guide according to places you want to visit.`,
   },
   {
      imgUrl: customizationImg,
      title: 'Expense Tracking',
      desc: `Track your Expenses and manage your expenses to know what you've spent for.`,
   },
]

const ServiceList = () => {
   return <>
      {
         servicesData.map((item, index) => (
            <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
               <ServiceCard item={item} />
            </Col>))
      }
   </>

}

export default ServiceList