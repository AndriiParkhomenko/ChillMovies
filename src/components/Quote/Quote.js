import { useState, useEffect } from "react";
import './Quote.scss';


export const Quote = () => {
	const [data, setData] = useState(null);
	const [hasSentRequest, setHasSentRequest] = useState(false);

	useEffect(() => {
		if (!hasSentRequest) {
			const url = 'https://api.api-ninjas.com/v1/quotes?category=movies';
			const apiKey = 'Iml1nHckh42Cko7XIv4HAg==tefbkPeEyBkrmTE8';

			fetch(url, {
				method: 'GET',
				headers: {
				'X-Api-Key': apiKey
				}
			})
			.then(response => {
			if (!response.ok) {
				throw new Error('Request failed with status code ' + response.status);
			}
			return response.json();
			})
			.then(data => {
				setData(data);
				setHasSentRequest(true);
			})
			.catch(error => {
				console.error('Error: ', error);
			});
		}
	}, [hasSentRequest]);


	return (
		<section className="random-quote" >
			{data && (
				<div className="quote-container">
					{data.slice(0, 1).map((item, index) => (
						<div className="quote" key={index}>
							<div className="quote__title">Quote of the moment</div>
							<div className="quote__text">{item.quote}</div>
							<div className="quote__author">{item.author}</div>
						</div>
					))}
				</div>
			)}
		</section>
	);
};