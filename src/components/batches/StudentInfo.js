import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import fetchBatches, { fetchOneBatch, fetchStudents } from '../../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../../actions/websocket'

class StudentInfo extends PureComponent {
    componentDidMount() {
      !this.props.batch && this.props.fetchBatches()
    }

    render() {
      // console.error(this.props);
      const { student, batch } = this.props
      if (!student) return null

      return (
        <div>
          <div className="studentInfo" style={{ display: 'flex'}}>
            <div className="photo" style={{ width: '33%' }}>
              <img src={student.photo} alt={student.name} width='100%'/>
            </div>
            <div className="info" style={{display: 'flex', flexFlow: 'column'}}>
              <p>Full name: {student.name}</p>
              <p>Batch Number: {batch.batchNumber}</p>
              <p>Last evaluation color: {student.lastColor}</p>
            </div>

            <div>
              <button onClick={this.onChangeColor}>GREEN</button>
            </div>
            <div>
              <button onClick={this.onChangeColor}>YELLOW</button>
            </div>
            <div>
              <button onClick={this.onChangeColor}>RED</button>
            </div>

          </div>
          <p>Daily evaluation</p>
        </div>
      )
    }
}

const mapStateToProps = ({ batches }, { match }) => {
    const batch = batches.filter((g) => (g._id === match.params.batchId))[0]
    const student = batch && batch.students ? batch.students.filter(item => item._id === match.params.studentId)[0] : null
    return {
      batch,
      student,
    }
}

export default connect(mapStateToProps, {
    subscribeToWebsocket,
    fetchBatches,
    fetchOneBatch,
    fetchStudents,
})(StudentInfo)
