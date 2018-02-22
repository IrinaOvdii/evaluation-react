import React, { PureComponent } from 'react'
// import Editor from 'react-medium-editor'
// import toMarkdown from 'to-markdown'
import { connect } from 'react-redux'
import DatePicker from 'material-ui/DatePicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import './RecipeEditor.css'
// import BATCH_CREATED  from '../actions/batches/subscribe'
import createBatch from '../../actions/batches/create'

class BatchEditor extends PureComponent {
  constructor(props) {
    super()

    const { butchNumber, startDate, endDate } = props


    this.state = {
      butchNumber,
      startDate,
      endDate
    }
  }

  updateBatchNumber(event) {
    this.setState({
      butchNumber: this.refs.butchNumber.value
    })
  }

  setStartDate(date) {
      this.setState({
        ...this.state,
        startDate: date
      });
  }

  setEndDate(date) {
      this.setState({
        ...this.state,
        endDate: date
      });
  }

  saveBatch() {
    const {
      butchNumber,
      startDate,
      endDate
    } = this.state

    const batch = {
      butchNumber,
      startDate,
      endDate
    }

    console.log(batch)
    this.props.createBatch(batch)

  }

  render() {
    return (
      <div className="editor">
        <h5>Create new Batch:</h5>
          <input
            type="text"
            ref="butchNumber"
            className="butchNumber"
            placeholder="Number of new batch"
            defaultValue={this.state.butchNumber}
            onChange={this.updateBatchNumber.bind(this)}
            onKeyDown={this.updateBatchNumber.bind(this)}
          />

          <input
            type="date"
            ref="startDate"
            className="startDate"
            datapicker
            selected={this.state.startDate} onChange={this.setStartDate.bind(this)}
          />

           <input
             type="date"
             ref="endDate"
             className="endDate"
             datapicker
             selected={this.state.endDate} onChange={this.setEndDate.bind(this)}
          />

        <div className="actions">
          <button className="primary" onClick={this.saveBatch.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

export default connect(null, { createBatch })(BatchEditor)
