import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import {
    BatchContainer,
    Batch,
    SignIn,
    SignUp,
    StudentInfo
} from './containers';

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={BatchContainer}/>
                <Route exact path="/batches/:batchId" component={Batch}/>
                <Route exact path="/batches/:batchId/students/:studentId" component={StudentInfo}/>
                <Route path="/sign-in" component={SignIn}/>
                <Route path="/sign-up" component={SignUp}/>
            </div>
        )
    }
  }
