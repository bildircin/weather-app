import './App.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import MapViewWeather from './components/MapViewWeather'
import ListViewWeather from './components/ListViewWeather'
import NotFound from './components/NotFound'
import Home from './components/Home';

function App() {
    //const count = useSelector(state => state.counter.value)
  return (
  <>
  <div className='sm:container sm:mx-auto '>
    <Header  />
    
    <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/map-view-weather' element={<MapViewWeather />}></Route>
        <Route path='/list-view-weather' element={<ListViewWeather />}></Route>
        <Route path='*' element= {<NotFound /> } />
    </Routes>
    

  </div>
  </>
  );
}

export default App;
