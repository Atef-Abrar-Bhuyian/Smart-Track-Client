import React from 'react';
import { TbError404 } from 'react-icons/tb';

const ErrorPage = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen text-center'>
            <h1 className='text-xl font-bold'>The Page You Are Looking For</h1>
            <TbError404 className='text-7xl' />
            <h1 className='text-xl font-bold'>Is Not Found</h1>
        </div>
    );
};

export default ErrorPage;