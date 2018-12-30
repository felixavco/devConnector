import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../commons/TextFieldGroup';
import TextAreaFieldGroup from '../commons/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions'

class AddEducation extends Component {
  constructor(props){
    super(props)
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      description: '',
      current: false,
      disabled: false, 
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChange = e => this.setState({[e.target.name]: e.target.value})
  

  onCheck = () => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current,
      to: ''
    })
  }

  onSubmit = e => {
    e.preventDefault();

    const { school, degree, fieldofstudy, from, to, current, description } = this.state
    
    const eduData = { school, degree, fieldofstudy, from, to, current, description }

    this.props.addEducation(eduData, this.props.history)
  }

  render() { 
    const { errors, school, degree, from, to, description, fieldofstudy, current, disabled } = this.state;

    return(
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">Add any school, bootcamp, online course etc, that you have attended</p>
              <small className="d-block pb-3">* = Required fields</small>
              <form onSubmit={this.onSubmit}>

                <TextFieldGroup 
                  placeholder="* School"
                  name="school"
                  value={school}
                  onChange={this.onChange}
                  error={errors.school}
                />

                <TextFieldGroup 
                  placeholder="* Degree"
                  name="degree"
                  value={degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />

                <TextFieldGroup 
                  placeholder="* Field of study"
                  name="fieldofstudy"
                  value={fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                />

                <h6>From Date</h6>
                <TextFieldGroup 
                  type="date"
                  name="from"
                  value={from}
                  onChange={this.onChange}
                  error={errors.from}
                />

                <h6>To Date</h6>
                <TextFieldGroup 
                  type="date"
                  name="to"
                  value={to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={disabled ? 'disabled' : ''}
                />

                <div className="form-check mb-4">
                  <input 
                    className="form-check-input"
                    type="checkbox" 
                    name="current"
                    value={current}
                    checked={current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    School not finished? 
                  </label>
                </div>

                <TextAreaFieldGroup 
                  placeholder="Job Description"
                  name="description"
                  value={description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the program that you attended"
                />

                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile, 
  errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));

