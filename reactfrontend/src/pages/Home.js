import React from 'react'
import HomeImage from '../nhlhome.jpg'

export default function Home() {
    return (
        <div className='container'>
            <div className='py-4'>
                Welcome to my NHL app
            </div>
            <img src={HomeImage} />
        </div>
    );
}
