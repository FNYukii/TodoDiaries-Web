import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundScreen from './components/screens/NotFoundScreen';
import TopScreen from './components/screens/TopScreen';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>

				<Route path="/" element={<TopScreen />} />
				<Route path="*" element={<NotFoundScreen />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);