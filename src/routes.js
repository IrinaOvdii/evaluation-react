// // src/routes.js
// import React, { Component } from 'react'
// import { Route } from 'react-router-dom'
//
// import {
//   BatchContainer,
//   Batch,
//   // BatchItem,
//   SignIn,
//   SignUp,
// } from './containers'
//
// import StudentInfo from './components/batches/StudentInfo'
//
//
// export default class Routes extends Component {
//   render() {
//     return (
//       <div>
//         <Route exact path="/" component={BatchContainer} />
//         <Route path="/batches/:batchId" component={Batch} />
//         <Route exact path="/batches/:batchId/:studentId" component={StudentInfo} />
//         <Route path="/sign-in" component={SignIn} />
//         <Route path="/sign-up" component={SignUp} />
//       </div>
//     )
//   }
// }


// src/routes.js
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import {
  BatchContainer,
  Batch,
  SignIn,
  SignUp
} from './containers';

import StudentInfo from './components/batches/StudentInfo';

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={BatchContainer} />
        <Route exact path="/batches/:batchId" component={Batch} />
        <Route exact path="/batches/:batchId/students/:studentId" component={StudentInfo} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    )
  }
}
