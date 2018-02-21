import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class BatchItem extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    batchNumber: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    // students: [ studentSchema ],
    // rating:  { type: String }
  }


  render() {
    const { _id, batchNumber, startDate, endDate } = this.props
    return(

          <article onClick={this.props.goToBatch}className="batch">
            <h2>
              Batch №{ batchNumber }
            </h2>
            <p> {startDate} - {endDate} </p>

          </article>

    )
  }
}

export default BatchItem
