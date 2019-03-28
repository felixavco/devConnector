import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profileActions'

class Experience extends Component {

  onDeleteClick = id => {
    this.props.deleteExperience(id)
  }

  render() {
    const { experience } = this.props
    const expTable = experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="MMMM Do, YYYY">{exp.from}</Moment> - {!exp.current ? <Moment format="MMMM Do, YYYY">{exp.to}</Moment> : "Current Job"}
        </td>
        <td><button onClick={() => this.onDeleteClick(exp._id)} className="btn btn-danger"><i className="fas fa-trash-alt" /></button></td>
      </tr>
    ))

    return(
      <div>
        <h4 className="mb-4">Experience Crendentials</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {expTable}
          </tbody>
        </table>
      </div>
    )
  }
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
}


export default connect(null, { deleteExperience })(Experience)
