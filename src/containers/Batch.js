import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchOneBatch, fetchStudents } from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import StudentEditor from '../components/batches/StudentEditor'
import './Batch.css'

const styles = {
    batchContainer: {
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    studentContainer: {
      width: '45%',
      border: '1px solid #000',
      margin: '5px',
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'center',
      cursor: 'pointer'
    }
}

const evaluationShape = PropTypes.shape({
    color: PropTypes.string,
    date: PropTypes.date,
    remark: PropTypes.string
})

const studentShape = PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.string,
    evaluation: evaluationShape,
})

class Batch extends PureComponent {
    static propTypes = {
      fetchOneBatch: PropTypes.func.isRequired,
      fetchStudents: PropTypes.func.isRequired,
      subscribeToWebsocket: PropTypes.func.isRequired,
      batch: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          students: PropTypes.arrayOf(studentShape).isRequired,
      }),
    }

  componentWillMount() {
      const { batch, fetchOneBatch, subscribeToWebsocket } = this.props;
      const { batchId } = this.props.match.params;

      if (!batch) {
          fetchOneBatch(batchId)
      }
      subscribeToWebsocket()
  }

  componentWillReceiveProps(nextProps) {
      const { batch } = nextProps;

      if (batch && !batch.students[0].name) {
          this.props.fetchStudents(batch)
      }
  }

  goToStudent = (student, batchId) => () => {
    this.props.push(`/batches/${batchId}/students/${student._id}`)
  }

  getRandomizedArray(items, amount) {
    if(0 === items.length){
      return []
    }

    var result = []
    for(var i = 0; i < amount; i++){
      result.push(items[Math.floor(Math.random() * items.length)]);
    }
    return result
  }

  onGetStudent = () => {
    const studentsRed = this.props.batch.students.filter(i => i.lastColor === 'Red')
    const studentsYellow = this.props.batch.students.filter(i => i.lastColor === 'Yellow')
    const studentsGreen = this.props.batch.students.filter(i => i.lastColor === 'Green')

    var randomizedStudents = []
      randomizedStudents = randomizedStudents.concat(
        this.getRandomizedArray(studentsGreen, 18),
        this.getRandomizedArray(studentsRed, 49),
        this.getRandomizedArray(studentsYellow, 33)
      )
    var index = Math.floor(Math.random()*randomizedStudents.length)
    var student = randomizedStudents[index]
    console.log(index)

    alert(`Question for ${student.name} with last color ${student.lastColor}`)
  }

  render() {
    const { batch } = this.props
    if (!batch) return null
    const { _id } = batch

    return (
      <div className='wrap'>
      <div style={styles.batchContainer} className="Batch">
        {batch.students.map(student => (
          <div
            style={styles.studentContainer}
            key={student._id}
            onClick={this.goToStudent(student, _id)} >

            <h5>{student.name}</h5>
            <img src={student.photo} alt={student.name} width='20%'/>
            <h6>{student.lastColor}</h6>

          </div>))}
          <div>
          </div>
            <button onClick={this.onGetStudent} className='ask-btn'>ASK A QUESTION </button>
          </div> <br/>
          <div className='edit-form'>
            < StudentEditor {...this.props}/>
          </div>
      </div>)
  }
}

const mapStateToProps = ({ batches }, { match }) => {
    const batch = batches.filter((g) => (g._id === match.params.batchId))[0];

    return {
        batch,
    }
}

export default connect(mapStateToProps, {
    subscribeToWebsocket,
    fetchOneBatch,
    fetchStudents,
    push
})(Batch)
