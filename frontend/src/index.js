import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Misc/Navbar.js'
import Register from './AuthPages/Register.js';
import Mainpage from './MainPage/MainPage';
import Login from './AuthPages/Login.js';
import StatsPage from './Stats/StatsPage';
import PastDreams from './PastDreams/PastDreams';
import MissingPage from './Misc/MissingPage';
import reportWebVitals from './reportWebVitals';
import { UserOnlyRoute, VisitorOnlyRoute } from './Misc/RouteProtect';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<UserOnlyRoute />}>
          <Route path="/all/:pageNum?" element={<PastDreams />} />
          <Route path="/stats" element={<StatsPage />} />
        </Route>
        <Route element={<VisitorOnlyRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<Mainpage />} />
        <Route path="*" element={<MissingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
