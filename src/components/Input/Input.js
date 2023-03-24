import PT from 'prop-types';
import cn from 'classnames';

import './Input.scss';

const DEFAULT_TYPE = 'text';

export const Input = ({type = DEFAULT_TYPE,  className, ...other}) => (
	<input {...other} type={type} className={cn('input', className)}/>
)

Input.propTypes ={
	// Type of input
	type: PT.oneOf(['text', 'email', 'password', 'number']),
	// Additional input's className
	className: PT.string,
}