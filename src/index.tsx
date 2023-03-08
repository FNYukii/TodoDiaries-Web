import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './Routes';
import './styles/output.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<Routes />
	</React.StrictMode>
);