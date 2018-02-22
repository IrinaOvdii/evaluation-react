import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const styles = {
    batchContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        border: '1px solid #b5b9bf',
        cursor: 'pointer',
        margin: '4px',
    }
}

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
          <div style={styles.batchContainer}
               className="Batch">
            <article onClick={this.props.goToBatch}className="batch">
              <h2>
                Batch №{ batchNumber }
              </h2>
              <p> {startDate} - {endDate} </p>

            </article>
          </div>

    )
  }
}

export default BatchItem
