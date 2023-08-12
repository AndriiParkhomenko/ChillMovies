import PT from 'prop-types';
import cn from 'classnames';
import React from 'react';

import './Input.scss';

const DEFAULT_TYPE = 'text';
const DEFAULT_AUTOCOMPLETE = 'off';

export const Input =  React.forwardRef(({ type = DEFAULT_TYPE, autoComplete = DEFAULT_AUTOCOMPLETE, className, ...other }, ref) => (
	<input 
		{...other} 
		type={type} 
		autoComplete={autoComplete} 
		className={cn('input', className)}
		ref={ref}
	/>
));

Input.propTypes ={
	// Type of input
	type: PT.oneOf(['text', 'email', 'password', 'number']),
	// Additional input's className
	className: PT.string,
}