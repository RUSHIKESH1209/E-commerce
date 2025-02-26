import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link, useParams } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
    const { productId } = useParams();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [productId]);

    return (
        <Link className='text-gray-700 cursor-pointer shadow-lg  block' to={`/product/${id}`}>
            <div className='overflow-hidden d'>
                <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt={name} />
            </div>
            <p className="pt-3 pl-2 text-sm">{name}</p>
            <p className='text-sm p-2 font-medium'>{currency}{price}</p>
        </Link>
    );
};

export default ProductItem;