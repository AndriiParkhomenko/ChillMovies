import React, { useState, useEffect } from 'react';

export const TypingEffect = ({ text, speed }) => {
	const [displayText, setDisplayText] = useState('');

	useEffect(() => {
		let currentIndex = 0;
		let intervalId;

		const typeText = () => {
			if (currentIndex < text.length) {
				currentIndex++;
				setDisplayText(prevText => prevText + text[currentIndex -1 ]);
			} else {
				clearInterval(intervalId); // Зупиняємо інтервал після набору всього тексту
			}
		};

		intervalId = setInterval(typeText, speed);

   	return () => clearInterval(intervalId); // Зупиняємо інтервал при розмонтуванні компонента
	}, [text, speed]);

	return <div>{displayText}</div>;
};
