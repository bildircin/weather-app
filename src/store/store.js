import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../counterSlice' //import our reducer from step 4
import cityReducer from '../citySlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        citys: cityReducer 
      }
})


