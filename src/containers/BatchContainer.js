// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches, { fetchStudents } from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import CreateBatchButton from '../components/batches/CreateBatchButton'
import BatchItem from '../components/batches/BatchItem'

// import Menu from 'material-ui/Menu'
// import MenuItem from 'material-ui/MenuItem'
import './BatchContainer.css'

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
        <h1>All Batches</h1>
        <CreateBatchButton />

          <main>
            { this.props.batches.map(this.renderBatch)}
          </main>
      </div>
    )
  }

}

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps, { fetchBatches, subscribeToWebsocket, fetchStudents, push })(BatchContainer)
