import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profileActions'

class Education extends Component {

  onDeleteClick = id => {
    this.props.deleteEducation(id)
  }

  render() {
    const { education } = this.props
    const eduTable = education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="MMMM Do, YYYY">{edu.from}</Moment> - {!edu.current ? <Moment format="MMMM Do, YYYY">{edu.to}</Moment> : "Current Job"}
        </td>
        <td><button onClick={() => this.onDeleteClick(edu._id)} className="btn btn-danger"><i className="fas fa-trash-alt" /></button></td>
      </tr>
    ))

    return(
      <div>
        <h4 className="mb-4">Education</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {eduTable}
          </tbody>
        </table>
      </div>
    )
  }
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
}


export default connect(null, { deleteEducation })(Education)

