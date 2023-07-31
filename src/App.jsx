import './App.css'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom" ; 
import Home from './pages/Home/main';
import About from './pages/About/main';
import Error from './pages/Error/main';
import Header from './components/Header/header';
import Footer from './components/Footer/Footer';

import { Provider } from 'react-redux';
import store from './assets/lib/store';
import Cart from './pages/Cart/main';
import Gallery from './pages/shop/main';




export function RouteS() {
  
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}  />
          <Route path='/about' element={<About />}  />
          <Route path='/shop' element={<Gallery />}  />
          <Route path='/cart' element={<Cart />}  />
          <Route path='/*' element={<Error />}  />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}


function App(){
  return(
    <>
      <Provider store={store}>
        <RouteS />
      </Provider>
    </>
  )
}

export default App
