import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchOneBatch, fetchStudents } from '../actions/batches/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import StudentInfo from '../components/batches/StudentInfo'

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
};

const evaluationShape = PropTypes.shape({
    color: PropTypes.string,
    date: PropTypes.date,
    remark: PropTypes.string
});

const studentShape = PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.string,
    evaluation: evaluationShape,
});

class Batch extends PureComponent {
    static propTypes = {
        fetchOneBatch: PropTypes.func.isRequired,
        fetchStudents: PropTypes.func.isRequired,
        subscribeToWebsocket: PropTypes.func.isRequired,
        batch: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            students: PropTypes.arrayOf(studentShape).isRequired,
        }),
    };

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

    selectStudent = (student, batchId) => () => {
        this.props.push(`/batches/${batchId}/students/${student._id}`)
    };

    render() {
      const { batch } = this.props;
      if (!batch) return null;
      const { _id } = batch;
      const names = batch.students.map(item => item.name);
      const randName = names[Math.floor(Math.random()*names.length)];


      return (
        <div style={styles.batchContainer} className="Batch">
            {batch.students.map(student => (
                  <div
                      style={styles.studentContainer}
                      key={student._id}
                      onClick={this.selectStudent(student, _id)}
                  >
                  <h5>{student.name}</h5>
                      <img src={student.photo} alt={student.name} width='20%'/>
                      <h6>{student.lastColor}</h6>
                  </div>))}

                  <div>
                    <button onClick={this.props.onGetStudent}>ASK A QUESTION</button>
                  </div>

        </div>)
        }

    }

const mapStateToProps = ({ batches }, { match }) => {
    const batch = batches.filter((g) => (g._id === match.params.batchId))[0];
    return {
        batch,
    }
};

export default connect(mapStateToProps, {
    subscribeToWebsocket,
    fetchOneBatch,
    fetchStudents,
    push
})(Batch)
