import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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
            // userId: string.isRequired,
            // updatedAt: PropTypes.string.isRequired,
            // createdAt: PropTypes.string.isRequired,
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

    selectStudent = student => () => {
        console.error(student)
    }
    // renderStudent(batch, index) {
    //   return (
    //     <StudentInfo
    //       key={index}
    //       // updateRecipe={this.props.updateRecipe}
    //       {...batch}
    //     />
    //   )
    // }

    render() {
        const { batch } = this.props;

        if (!batch) return null;

        return (
            <div style={styles.batchContainer}
                 className="Batch">
                {batch.students.map(student => (
                    <div
                        style={styles.studentContainer}
                        key={student._id}
                        onClick={this.selectStudent(student)}
                        // onClick={batch.students.map(this.renderStudent.bind(this))}
                    >
                    <h5>{student.name}</h5>
                    <img src={student.photo} alt={student.name} width='20%'/>
                    <h6>{student.lastColor}</h6>
                </div>))}

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
})(Batch)
