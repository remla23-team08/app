import * as React from 'react';
import HomePage from './pages/home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import RestaurantPage from './pages/restaurant-picker';
import ReviewPage from './pages/review';
import MyNavbar from './navbar';


const App = () => {
	return (
		<BrowserRouter>
			<MyNavbar/>
			<Routes>
				<Route index path="/" element={<HomePage/>} />
				<Route path='/restaurant-picker' element={<RestaurantPage/>} />
				<Route path='/review' element={<ReviewPage/>} />
				<Route element={<HomePage/>} /> {/** When wrong path is set go to the homepage */}
			</Routes>
		</BrowserRouter>
	);
}

export default App