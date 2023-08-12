import { Link } from 'react-router-dom';

import { Button } from '../../components/Button/Button';

import './NotFoundPage.scss';

export const NotFoundPage = () => (
	<div className="error-info">
		<h6>Sorry, wrong url</h6>
		<div>
			<img src="/images/Jack-Sparrow.webp" className="error-image" alt="Error"/>
		</div>
		<h6>Error 404 - page not found</h6>
		<Link to={`/`}>
			<Button className="error-btn">Return to Homepage</Button>
		</Link>
	</div>
)