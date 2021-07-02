import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Intro from './pages/Intro'
import Groups from './pages/Groups'

const Routes = () => {
  return(
      <BrowserRouter>
        <Route exact component={Intro} path='/' />
        <Route component={Groups} path='/groups' />
      </BrowserRouter>
  )
}

export default Routes;