import { NavLink } from "react-router-dom";

import { SocialMedia } from "../SocialMedia/SociaMedia";
import './Burger.scss';

export const Burger = ({links, onClickCloseIcon, active}) => (
	<div className={active ? 'side' : 'side-out'}>
		<div className={active ? 'side-content': 'side-content burger-close'}>
			<div className="side-content__top top">
				<img className="top__close" onClick={onClickCloseIcon} src="/images/icons/x-square.svg" alt="close" />
				<p className='top__logo' onClick={onClickCloseIcon}><span>Chill</span>&movies</p>
			</div>
			<nav className="side-content__main">
				<ul className="side-content__list">
					{links.map( ({id, url, title}) =>
						<li key={id} className="side-content__item">
							<NavLink to={url} onClick={onClickCloseIcon} className="side-content__link">{title}</NavLink>
						</li>
						)}
				</ul>
			</nav>
			<div className="side-content__footer">
				<div className="side-content__social-media"><SocialMedia/></div>
				</div>
		</div>
	</div>
)