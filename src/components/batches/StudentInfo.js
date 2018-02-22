import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import fetchBatches, { fetchOneBatch, fetchStudents } from '../../actions/batches/fetch';
import { connect as subscribeToWebsocket } from '../../actions/websocket';

class StudentInfo extends Component {
    componentDidMount() {
        !this.props.batch && this.props.fetchBatches();
    }

    render() {
        console.error(this.props);
        const { student, batch } = this.props;
        if (!student) return null;
        return (
            <div>
                <div className="studentInfo" style={{
                    display: 'flex',
                }}>
                    <div className="photo" style={{ width: '33%' }}>
                        <img src={student.photo} alt={student.name} width='100%'/>
                    </div>
                    <div className="info" style={{display: 'flex', flexFlow: 'column'}}>
                        <p>{student.name}</p>
                        <p>{batch.batchNumber}</p>
                        <p>Some color line</p>
                    </div>
                </div>
                <p>Daily evalueation</p>
            </div>
        )
    }
};

const mapStateToProps = ({ batches }, { match }) => {
    const batch = batches.filter((g) => (g._id === match.params.batchId))[0];
    const student = batch && batch.students ? batch.students.filter(item => item._id === match.params.studentId)[0] : null;
    return {
        batch,
        student,
    }
};

export default connect(mapStateToProps, {
    subscribeToWebsocket,
    fetchBatches,
    fetchOneBatch,
    fetchStudents,
    push,
})(StudentInfo)
