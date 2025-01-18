import React from 'react';

const CustomBtn = ({text}) => {
    return (
        <div>
            <button className='inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900 hover:animate-pulse'>{text}</button>
        </div>
    );
};

export default CustomBtn;