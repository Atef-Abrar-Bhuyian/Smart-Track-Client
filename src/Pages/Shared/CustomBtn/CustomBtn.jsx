import React from 'react';

const CustomBtn = ({text}) => {
    return (
        <div>
            <button className='bg-cyan-300 py-2 px-3 rounded-lg hover:text-white hover:bg-cyan-600 hover:animate-pulse'>{text}</button>
        </div>
    );
};

export default CustomBtn;