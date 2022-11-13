import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo-ecommerce.png';

const Header = () => {
    return (
        <div>
            <div className='w-10/12 mx-auto flex justify-between'>
                <img src={Logo} alt="logo" className='max-w-40'/>

                 <div className='flex justify-between'>
                    <Link>Home</Link>
                    </div>   
            </div>
        </div>
    );
};

export default Header;