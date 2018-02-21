// src/routes.js
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  BatchContainer,
  Batch,
  // BatchItem,
  SignIn,
  SignUp,
} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={BatchContainer} />
        <Route path="/batches/:batchId" component={Batch} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    )
  }
}
