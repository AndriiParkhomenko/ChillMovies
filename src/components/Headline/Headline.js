import './Headline.scss';

export const Headline = ({text = 'text', children}) => (
	<div className='headline'>
		<span>{text}</span>
		<p>{children}</p>
		<div className='headline-border'></div>
	</div>
)