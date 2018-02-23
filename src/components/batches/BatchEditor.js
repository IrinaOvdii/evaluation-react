import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'material-ui/DatePicker';
import createBatch from '../../actions/batches/create'

class BatchEditor extends PureComponent {
  constructor(props) {
    super()
    const { batchNumber, startDate, endDate } = props

    this.state = {
      batchNumber,
      startDate,
      endDate
    }
  }

  updateBatchNumber(event) {
    this.setState({
      batchNumber: this.refs.batchNumber.value
    })
    console.log(this.refs.batchNumber)
  }

  saveBatch() {
    const startDate = this.refs.startDate.state.date
    const endDate = this.refs.endDate.state.date
    const { batchNumber } = this.state

    const batch = {
      batchNumber,
      startDate,
      endDate
    }

    console.log(batch)
    this.props.createBatch(batch)
  }

  render() {
    return (
      <div className="editor">
        <h5>Create New Batch:</h5>
          <input
            type="text"
            ref="batchNumber"
            className="batchNumber"
            placeholder="Number of new batch"
            defaultValue={this.state.batchNumber}
            onChange={this.updateBatchNumber.bind(this)}
            onKeyDown={this.updateBatchNumber.bind(this)}
          />

        <div>
          <DatePicker ref="startDate" hintText="Start Date" container="inline" />
          <DatePicker ref="endDate" hintText="End Date" container="inline" mode="landscape" />
        </div>

        <div className="actions">
          <button className="primary" onClick={this.saveBatch.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

export default connect(null, { createBatch })(BatchEditor)
