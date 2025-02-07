import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'


const main =()=>{
	const root = ReactDOM.createRoot(document.getElementById('root'));
  	return(
    	root.render(
		<BrowserRouter>
		<Routes>
		<Route path='/' element={<App/>}/>
		
		</Routes>
		</BrowserRouter>
		)

  );
};

export default main;