import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import dbg1 from './assets/images/bg (1).jpg';
import dbg2 from './assets/images/bg (2).jpg';
import dbg3 from './assets/images/bg (3).jpg';
import dbg4 from './assets/images/bg (4).jpg';
import dbg5 from './assets/images/bg (5).jpg';
import dbg6 from './assets/images/bg (6).jpg';
import dbg7 from './assets/images/bg (7).jpg';
import dbg8 from './assets/images/bg (8).jpg';
import dbg9 from './assets/images/bg (9).jpg';
import dbg10 from './assets/images/bg (10).jpg';
import dbg11 from './assets/images/bg (11).jpg';
import dbg13 from './assets/images/bg (13).jpg';
import dbg14 from './assets/images/bg (14).jpg';
import dbg15 from './assets/images/bg (15).jpg';
import dbg16 from './assets/images/bg (16).jpg';
import './index.css';

const App = () => {
	const [centerImageIndex, setCenterImageIndex] = useState(8);
	const [backgroundImageIndex, setBackgroundImageIndex] = useState(null);
	const [textInput, setTextInput] = useState("");
	const [previewMode, setPreviewMode] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 500); // Mobile check
	const captureRef = useRef(null);

	const images = [
		dbg1, dbg2, dbg3, dbg4, dbg5, dbg6, dbg7, dbg8, dbg9,
		dbg10, dbg11, dbg13, dbg14, dbg15, dbg16
	];

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 500); // Update mobile check on resize
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		const savedText = localStorage.getItem('textInput');
		if (savedText) {
			setTextInput(savedText);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('textInput', textInput);
	}, [textInput]);

	const moveLeft = () => {
		setCenterImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
	};

	const moveRight = () => {
		setCenterImageIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const handleImageClick = (index) => {
		setBackgroundImageIndex(index);
		// console.log(index);
		
	};

	const handlePreview = () => {
		setPreviewMode(true);
		if (captureRef.current) {
            html2canvas(captureRef.current).then((canvas) => {
                const link = document.createElement('a');
                link.download = 'capture.png';
                link.href = canvas.toDataURL();
                link.click();
            });
        }
	};

	return (
		<div className={`w-screen h-screen flex flex-col items-center justify-center bg-cover bg-center ${previewMode ? 'bg-black' : ''}`}>
			{previewMode ? (
				<div className='flex flex-col items-center justify-center'>
					<div className='text-white p-6 rounded-xl px-8 absolute top-[50%] translate-y-[-50%] max-w-[50vw] z-50 text-lg mb-4 bg-[#ffffff20] backdrop-blur-lg'>{textInput}</div>
					<div className='w-full h-full flex items-center justify-center'>
						{backgroundImageIndex !== null && (
							<img src={images[backgroundImageIndex]} alt="" className='object-cover w-screen h-full rounded-lg shadow-lg' />
						)}
					</div>
					<button onClick={() => setPreviewMode(false)} className='mt-5 bg-red-500 text-white px-4 py-2 rounded'>
						Back
					</button>
				</div>
			) : (
				<div className='bg-black relative  h-full flex flex-col items-center  '>
					<div className='w-screen  flex justify-center mt-12 mb-16'>
						<textarea
							value={textInput}
							onChange={(e) => setTextInput(e.target.value)}
							maxLength={120}
							className={`h-32 ${isMobile ? 'w-3/4' : 'w-1/4'} outline-none rounded-xl p-4`} // Adjust width for mobile
							placeholder="Type something..."
						/>
					</div>
					<div className='' >
						<div className='flex items-center justify-center py-6 '>
							<button onClick={moveLeft} className='text-4xl px-2 py-2 rounded-full hover:bg-gray-500 text-white'>
								<FaAngleLeft />
							</button>
							<div className='flex overflow-hidden w-4/5 '>
								<div
									className='flex transition-transform duration-500'
									style={{
										transform: `translateX(-${centerImageIndex * 320}px)`,
									}}
								>
									{images.map((image, index) => (
										<img
										key={index}
										src={image}
										alt=""
										onClick={() => handleImageClick(index)}
										className={`rounded-2xl shadow-2xl transition-transform duration-300 ${index === backgroundImageIndex ? "border-4 border-blue-400" : ""} ${isMobile ? 'w-60' : 'w-80'} m-5 h-fit cursor-pointer ${index === centerImageIndex ? 'scale-125' : 'scale-100'}`}
									/>
									
									))}
								</div>
							</div>
							<button onClick={moveRight} className='text-4xl px-2 py-2 rounded-full hover:bg-gray-500 text-white'>
								<FaAngleRight />
							</button>
						</div>
					</div>
					<button onClick={handlePreview} className='mt-5 bg-blue-500 max-w-60 min-w-fit text-white px-4 py-2 rounded'>
						Preview
					</button>
				</div>
			)}
		</div>
	);
};

export default App;
