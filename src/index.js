import React from 'react';
import ReactDOM from 'react-dom/client';
import { Root } from './Root';
import reportWebVitals from './reportWebVitals';

document.cookie = 'cookieName=value; SameSite=Lax';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);

reportWebVitals();
