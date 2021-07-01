import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Intro from './pages/Intro'

const Routes = () => {
  return(
      <BrowserRouter>
        <Route exact component={Intro} path='/' />
      </BrowserRouter>
  )
}

export default Routes;