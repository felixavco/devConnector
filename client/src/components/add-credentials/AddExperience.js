import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../commons/TextFieldGroup';
import TextAreaFieldGroup from '../commons/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions'

class AddExperience extends Component {
  constructor(props){
    super(props)
    this.state = {
      company: '',
      title: '',
      location: '',
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

    const { company, title, location, from, to, current, description } = this.state
    
    const expData = { company, title, location, from, to, current, description }

    this.props.addExperience(expData, this.props.history)
  }

  render() { 
    const { errors, company, title, from, to, description, location, current, disabled } = this.state;

    return(
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">Add any job or possition that you have had in the past or current</p>
              <small className="d-block pb-3">* = Required fields</small>
              <form onSubmit={this.onSubmit}>

                <TextFieldGroup 
                  placeholder="* Company"
                  name="company"
                  value={company}
                  onChange={this.onChange}
                  error={errors.company}
                />

                <TextFieldGroup 
                  placeholder="* Job Title"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  error={errors.title}
                />

                <TextFieldGroup 
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={this.onChange}
                  error={errors.location}
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
                    Current job
                  </label>
                </div>

                <TextAreaFieldGroup 
                  placeholder="Job Description"
                  name="description"
                  value={description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the position"
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile, 
  errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));

