import React, { useState } from 'react';

import './BulbAnimation.scss';

export const BulbAnimation = () => {
  const [switchOn, setSwitchOn] = useState(false);
  const bulbs = Array(10).fill(switchOn);

  const handleSwitchClick = () => {
    setSwitchOn(!switchOn);
  };

  return (
    <div className={`bulb-animation ${switchOn ? 'on' : ''}`}>
		{bulbs.map((isOn, index) => (
			<div key={index} className="light">
				<div className="wire"></div>
				<div className="bulb ">
					<span></span>
					<span></span>
				</div>
			</div>
		))}
        <div className="switch">
          <div className="btn" onClick={handleSwitchClick}></div>
        </div>
    </div>
  );
};








