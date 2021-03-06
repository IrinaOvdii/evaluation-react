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
  }


  render() {
    const { _id, batchNumber, startDate, endDate } = this.props
    const shortStartDate = new Date(startDate).toLocaleDateString()
    const shortEndtDate = new Date(endDate).toLocaleDateString()
    return(
      <div style={styles.batchContainer} className="Batch">
        <article onClick={this.props.goToBatch} className="batch">
          <h2>
            Batch №{ batchNumber }
          </h2>
          <p> {shortStartDate} - {shortEndtDate} </p>
        </article>
      </div>
    )
  }
}

export default BatchItem
