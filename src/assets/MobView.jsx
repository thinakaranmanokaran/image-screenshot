import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import mbg1 from './images/mbg (1).jpg';
import mbg2 from './images/mbg (2).jpg';
import mbg3 from './images/mbg (3).jpg';
import mbg4 from './images/mbg (4).jpg';
import mbg5 from './images/mbg (5).jpg';
import mbg6 from './images/mbg (6).jpg';
import mbg7 from './images/mbg (7).jpg';
import mbg8 from './images/mbg (8).jpg';
import mbg9 from './images/mbg (9).jpg';
import mbg10 from './images/mbg (10).jpg';
import mbg11 from './images/mbg (11).jpg';
import mbg12 from './images/mbg (12).jpg';
import mbg13 from './images/mbg (13).jpg';
import mbg14 from './images/mbg (14).jpg';
import mbg15 from './images/mbg (15).jpg';
import mbg16 from './images/mbg (16).jpg';
import mbg17 from './images/mbg (17).jpg';
import mbg18 from './images/mbg (18).jpg';
import mbg19 from './images/mbg (19).jpg';
import './../index.css';

const MobView = () => {
    const [centerImageIndex, setCenterImageIndex] = useState(0);
    const [textInput, setTextInput] = useState('');
    const [displayText, setDisplayText] = useState('');
    const [backgroundImageIndex, setBackgroundImageIndex] = useState(null);
    const [showElements, setShowElements] = useState(true); // State to control visibility

    const mobileImages = [
        mbg1, mbg2, mbg3, mbg4, mbg5, mbg6,
        mbg7, mbg8, mbg9, mbg10, mbg11, mbg12,
        mbg13, mbg14, mbg15, mbg16, mbg17, mbg18, mbg19
    ];

    const moveLeft = () => {
        setCenterImageIndex((prevIndex) => (prevIndex - 1 + mobileImages.length) % mobileImages.length);
    };

    const moveRight = () => {
        setCenterImageIndex((prevIndex) => (prevIndex + 1) % mobileImages.length);
    };

    const handleImageClick = (index) => {
        setBackgroundImageIndex(index);
    };

    const handlePreviewClick = () => {
        setDisplayText(textInput);
        setShowElements(false); // Hide elements when preview is clicked
    };

    return (
        <div className={`w-screen h-screen bg-black flex flex-col items-center justify-center bg-cover bg-center transition-all duration-500 ${backgroundImageIndex !== null ? `mbg-image-${backgroundImageIndex + 1}` : ''}`}>
            {showElements && (
                <>
                    <div className='mt-5 w-full flex flex-col items-center '>
                        <textarea
                            maxLength={120}
                            className='h-16 w-3/4 focus:outline-none rounded-xl p-2 '
                            placeholder="Type something..."
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                        />
                    
                    </div>
                    <div className='flex items-center justify-center mt-10'>
                        <button onClick={moveLeft} className='text-4xl px-3 py-1 text-white'>
                            <FaAngleLeft />
                        </button>
                        <div className='flex overflow-hidden'>
                            <img
                                src={mobileImages[centerImageIndex]}
                                alt={`Background ${centerImageIndex + 1}`}
                                className='w-full max-w-40 rounded-2xl shadow-lg transition-transform duration-300 cursor-pointer'
                                onClick={() => handleImageClick(centerImageIndex)} // Click to set the background
                            />
                        </div>
                        <button onClick={moveRight} className='text-4xl px-3 py-1 text-white'>
                            <FaAngleRight />
                        </button>
                    </div>
                    <button onClick={handlePreviewClick} className='mt-5 h-10 px-4 rounded-xl bg-blue-500 text-white'>
                            Preview
                        </button>
                
                </>
            )}
           {
            displayText && 
            <div className='text-white p-6 rounded-xl px-8 absolute top-[50%] translate-y-[-50%] max-w-[80vw] z-50 text-sm mb-4 bg-[#ffffff20] backdrop-blur-lg'>
            {displayText}
        </div>
           }
        </div>
    );
};

export default MobView;
