import React from 'react'
import {GlobalProvider} from './context/Globalcontext'
import MainForm from './components/MainForm'

const App = () => {
  return (<GlobalProvider>
  <div>

    <MainForm />

    </div>
    </GlobalProvider>)
}

export default App