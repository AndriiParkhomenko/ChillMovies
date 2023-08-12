import { BulbAnimation } from '../../components/BulbAnimation/BulbAnimation';
import { Headline } from '../../components/Headline/Headline';
import { TypingEffect } from '../../components/TypingEffect/TypingEffect';
import './AboutPage.scss';

export const AboutPage = () => {
	const introduction = `The film portfolio site is designed for educational purposes. This project was created to showcase my web development and frontend skills.
	This site features a variety of features and capabilities that can be found on today's movie websites. You will be able to search for movies by genre, view descriptions, ratings and other information about popular movies.`

	const stack = `The site has an intuitive and attractive design that provides convenient navigation and user experience. It is developed using modern web technologies such as HTML, CSS and JavaScript, as well as frameworks (React) and libraries that help ensure efficient development and interaction with the API server.
	Developing this site was a great opportunity for me to improve my web development skills and show my creativity and problem solving ability.`
	
	const result = `I learned how to work with project structure, manage application state, use third-party APIs to retrieve data, and implement interactive elements for users.
	This project showcases my passion for film and my ability to apply web development to create useful and attractive web applications. I continue to develop and learn new technologies to create even better projects.`;
	
	const speed1 = 25;
	const speed2 = 50;
	const speed3 = 75;

	return (
		<div className='about'>
			<Headline text='discover more'>Our Story</Headline>
			<div className='about-container'>
				<div className='about-content introduction'>
					<div className='about-content__image'>
						<img src='/images/about_us/projector.jpg' alt='projector'/>
					</div>
					<div className='about-content__text'>
						<TypingEffect text={introduction} speed={speed1}/>
					</div>
				</div>
				<div className='about-content stack'>
					<div className='about-content__text'>
						<TypingEffect text={stack} speed={speed2}/>
					</div>
					<div className='about-content__image'>
						<img src='/images/about_us/tapes.jpg' alt='tapes'/>
					</div>
				</div>
				<div className="about-animation">
					<BulbAnimation/>
					<div className='result'>
						<TypingEffect text={result} speed={speed3}/>
					</div>
				</div>
			</div>
		</div>
	)
}