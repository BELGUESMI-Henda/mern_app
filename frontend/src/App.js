import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import BusScreen from './screens/BusScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import TicketScreen from './screens/TicketScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceBookingScreen from './screens/PlaceBookingScreen'
import BookingScreen from './screens/BookingScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import BusListScreen from './screens/BusListScreen'
import BusEditScreen from './screens/BusEditScreen'
import BookingListScreen from './screens/BookingListScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/booking/:id' component={BookingScreen} />
          <Route path='/ticket' component={TicketScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placebooking' component={PlaceBookingScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/bus/:id' component={BusScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/buslist'
            component={BusListScreen}
            exact
          />
          <Route
            path='/admin/buslist/:pageNumber'
            component={BusListScreen}
            exact
          />
          <Route path='/admin/bus/:id/edit' component={BusEditScreen} />
          <Route path='/admin/bookinglist' component={BookingListScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
