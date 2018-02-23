// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches, { fetchStudents } from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import BatchItem from '../components/batches/BatchItem'
import BatchEditor from '../components/batches/BatchEditor'

class BatchContainer extends PureComponent {
  static propTypes = {
    batches: PropTypes.array.isRequired,
    fetchBatches: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchBatches()
    this.props.subscribeToWebsocket()
  }

  goToBatch = batchId => event => this.props.push(`/batches/${batchId}`)

  renderBatch = (batch, index) => {
    return (
      <BatchItem
        key={index}
        goToBatch={this.goToBatch(batch._id)}
         { ...batch}
      />
    )
  }

  render() {
    return(
      <div className="batches wrapper">
        <h1 style={{ 'text-align': 'center'}}>All Batches</h1>
          <main>
            { this.props.batches.map(this.renderBatch)}
          </main>
        < BatchEditor />
      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps, { fetchBatches, subscribeToWebsocket, fetchStudents, push })(BatchContainer)
