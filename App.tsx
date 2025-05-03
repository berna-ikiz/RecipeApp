import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { fetchCategories } from './src/api/api'
import { FavouritesProvider } from './src/stores/FavouritesContext'
import SampleScreen from './src/screens/SampleScreen'

const App = () => {
  useEffect(() => {
    const getCategories = async ()=>{
      const categories = await fetchCategories();
      console.log(JSON.stringify(categories, null, 2));
    }
   getCategories();
  }, [])
  
  return (
   <FavouritesProvider>
    <SampleScreen/>
   </FavouritesProvider>
  )
}

export default App