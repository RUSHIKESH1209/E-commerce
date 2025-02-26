import React from 'react';
import Title from '../components/Title';
import Newsletter from '../components/Newsletter';
import { assets } from '../assets/frontend_assets/assets';

const Contact = () => {
  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      {/* Header Section */}
      <div className='text-2xl text-center pt-8 border-t' style={{ borderColor: '#E0E0E0' }}>
        <Title text1={'CONTACT '} text2={'US'} />
      </div>

      {/* Main Content Section */}
      <div className='my-10 flex flex-col md:flex-row gap-16 px-4 sm:px-10'>
        {/* Image */}
        <img
          className='w-full md:max-w-[450px] rounded-lg shadow-lg'
          src={assets.contact_img}
          alt='About Us'
        />

        {/* Contact Details */}
        <div className='flex flex-col justify-center gap-6 md:w-2/4'>
          <p className='font-semibold text-xl' style={{ color: '#FF6B6B' }}>
            Our Store
          </p>
          <p style={{ color: '#2E2E2E' }}>
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>
          <p style={{ color: '#2E2E2E' }}>
            Tel: (415) 555-0132 <br />
            Email: admin@forever.com
          </p>
          <p className='font-semibold text-xl' style={{ color: '#FF6B6B' }}>
            Careers at Forever
          </p>
          <p style={{ color: '#2E2E2E' }}>
            Learn more about our teams and job openings.
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className='mt-8 px-4 sm:px-10'>
        <Newsletter />
      </div>
    </div>
  );
};

export default Contact;