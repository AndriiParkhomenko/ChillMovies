import cn from 'classnames';
import PT from 'prop-types';


import './Loader.scss';

export const Loader = ({className}) => (
	<div className={cn('spinner', className)}>
		<div className="rect1"></div>
		<div className="rect2"></div>
		<div className="rect3"></div>
		<div className="rect4"></div>
		<div className="rect5"></div>
	</div>
)

Loader.propTypes = {
	// Additional loader's class name
	className: PT.string
}