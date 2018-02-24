import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import {
    BatchContainer,
    Batch,
    SignIn,
    // StudentInfo
} from './containers';
import StudentInfo from './components/batches/StudentInfo'

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={BatchContainer}/>
                <Route exact path="/batches/:batchId" component={Batch}/>
                <Route exact path="/batches/:batchId/students/:studentId" component={StudentInfo}/>
                <Route path="/sign-in" component={SignIn}/>

            </div>
        )
    }
  }
