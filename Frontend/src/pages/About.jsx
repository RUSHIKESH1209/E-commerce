import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import Newsletter from '../components/Newsletter';

const About = () => {
  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      {/* Header Section */}
      <div className='text-2xl text-center pt-8 border-t' style={{ borderColor: '#E0E0E0' }}>
        <Title text1={'ABOUT '} text2={'US'} />
      </div>

      {/* Main Content Section */}
      <div className='my-10 flex flex-col md:flex-row gap-16 px-4 sm:px-10 items-center'>
        {/* Image */}
        <img
          className='w-full md:max-w-[450px] rounded-lg shadow-lg'
          src={assets.about_img}
          alt='About Us'
        />

        {/* Text Content */}
        <div className='flex flex-col justify-center gap-6 md:w-2/4' style={{ color: '#2E2E2E' }}>
          <p>
            Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online.
            Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase
            a wide range of products from the comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference.
            From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
          </p>

          <p className='font-semibold text-xl' style={{ color: '#FF6B6B' }}>Our Mission</p>
          <p>
            Our mission at Forever is to empower customers with choice, convenience, and confidence.
            We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='mt-5 text-2xl text-center md:text-left'>
        <Title text1={'WHY '} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row gap-6 px-4 sm:px-10 my-10'>
        {[
          { title: 'Quality Assurance', text: 'We meticulously select and vet each product to ensure it meets our stringent quality standards.' },
          { title: 'Fast & Secure Delivery', text: 'We guarantee timely delivery with secure packaging to ensure your orders arrive safely.' },
          { title: 'Customer Satisfaction', text: 'Our dedicated support team is always ready to assist you with any inquiries or issues.' }
        ].map((item, index) => (
          <div key={index} className='border p-6 rounded-lg shadow-md text-center md:text-left' style={{ borderColor: '#E0E0E0' }}>
            <b className='text-gray-900'>{item.title}</b>
            <p className='text-gray-500 text-sm mt-3'>{item.text}</p>
          </div>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className='mt-8 px-4 sm:px-10'>
        <Newsletter />
      </div>
    </div>
  );
};

export default About;
