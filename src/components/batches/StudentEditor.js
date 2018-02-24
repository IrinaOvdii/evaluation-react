import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import { fetchOneBatch, fetchStudents } from '../actions/batches/fetch'
import createStudent from '../../actions/batches/create'

class StudentEditor extends PureComponent {
  constructor(props) {
    super()
    const { name, photo, lastColor } = props

    this.state = {
      name,
      photo,
      lastColor
    }
  }

  updateName(event) {
    this.setState({
      name: this.refs.name.value
    })
  }

  updatePhoto(event) {
    this.setState({
      photo: this.refs.photo.value
    })
  }

  updateLastColor(event) {
    this.setState({
      lastColor: this.refs.lastColor.value
    })
  }

  saveStudent(event) {
    const {
      name,
      photo,
      lastColor
    } = this.state

    const newstudent = {
      name,
      photo,
      lastColor
    }

    const batchId = this.props.batch._id
    // const { batchId } = this.props.match.params

    if(!name || !photo) {
      return
    }
    this.props.createStudent(batchId, newstudent)
  }

  render() {
    return (
      <div className="editor">
        <h4>Add a new student</h4>
        <input
          type="text"
          ref="name"
          className="name"
          placeholder="Name of student"
          onChange={this.updateName.bind(this)}
          onKeyDown={this.updateName.bind(this)} />

          <input
            type="text"
            ref="photo"
            className="photo"
            placeholder="Link to photo"
            onChange={this.updatePhoto.bind(this)}
            onKeyDown={this.updatePhoto.bind(this)} />

            <input
              type="text"
              ref="lastColor"
              className="lastColor"
              placeholder="Color of evaluation"
              onChange={this.updateLastColor.bind(this)}
              onKeyDown={this.updateLastColor.bind(this)} />

        <div className="actions">
          <button className="primary" onClick={this.saveStudent.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

export default connect(null, { createStudent })(StudentEditor)
