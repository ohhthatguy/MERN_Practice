import React from 'react'
import {GlobalProvider} from './context/Globalcontext'
import MainForm from './components/MainForm'

const App = () => {
  return (<GlobalProvider>
              <MainForm />
    </GlobalProvider>)
}

export default App