import './App.css'
import Home from './screens/Home'
import Booking from './screens/Booking'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './screens/Landing';
import Regester from './screens/Rejester';
import Login from './screens/Login';
import GetBooking from './screens/GetBooking';

function App() {
  

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home></Home>} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/regester" element={<Regester />} />
      <Route path="/login" element={<Login />} />
      <Route path="/getBookings" element={<GetBooking />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  </Router>
         
  )
}

export default App
