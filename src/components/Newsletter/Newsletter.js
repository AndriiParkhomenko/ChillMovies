import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import './Newsletter.scss';

export const Newsletter = () => (
	<section className='newsletter'>
		<div className='newsletter__left'>Subscribe to our newsletter</div>
		<div className='newsletter__right'>
			<p className='newsletter__text'>
				Stay informed with the latest news and updates. Subscribe to our newsletter for exclusive content and special offers.
			</p>
			<form className='newsletter__form'>
				<Input
				type='email'
				name='email'
				placeholder='Enter your email address here'
				className='newsletter__input'
				size={30}
				/>
				<Button type='submit' className='newsletter__button'>Send<span></span></Button>
			</form>
		</div>
	</section>
)