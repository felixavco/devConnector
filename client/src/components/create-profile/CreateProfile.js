import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../commons/TextFieldGroup'
import TextAreaFieldGroup from '../commons/TextAreaFieldGroup'
import SelectListGroup from '../commons/SelectListGroup'
import InputGroup from '../commons/InputGroup'
import { createProfile } from '../../actions/profileActions'

class CreateProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '', 
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    }
  }
  

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  onSubmit = e => {
  
    e.preventDefault()

    const profileData = {...this.state}

    this.props.createProfile(profileData, this.props.history)
  }

  render() {

    const { 
      errors, 
      handle, 
      status, 
      company, 
      website, 
      skills, 
      githubusername,
      location,
      bio,
      displaySocialInputs,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    } = this.state

    let socialInputs;

    if(displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup 
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup 
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup 
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup 
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup 
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />

        </div>
      )
    }

    //Select options for Status 
    const options = [
      {label: '* Select Professional Status', value: 0 },
      {label: 'Junior Developer', value: 'Junior Developer'},
      {label: 'Senior Developer', value: 'Senior Developer'},
      {label: 'Manager', value: 'Manager'},
      {label: 'Student or Learning', value: 'Student or Learning'},
      {label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
      {label: 'Intern', value: 'Intern'},
      {label: 'Other', value: 'Other'}
    ]

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Create Your Profile
              </h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                  placeholder="* Profile Handle"
                  name="handle"
                  value={handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique hanble for your profile URL. Your full name, company name, nickname."
                />

                <SelectListGroup 
                  placeholder="Status"
                  name="status"
                  value={status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Tell us where you are in your career."
                />

                <TextFieldGroup 
                  placeholder="Company"
                  name="company"
                  value={company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Can be your own company or a company you work for."
                />

                <TextFieldGroup 
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Your Location"
                />

                <TextFieldGroup 
                  placeholder="Website"
                  name="website"
                  value={website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Your personal website or your comany website."
                />

                <TextFieldGroup 
                  placeholder="* Skills"
                  name="skills"
                  value={skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values eg. HTML, CSS, JavaScript, PHP."
                />

                <TextFieldGroup 
                  placeholder="Github Username"
                  name="githubusername"
                  value={githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want latest repos and a Github link, include your username."
                />

                <TextAreaFieldGroup 
                  placeholder="Shot Bio"
                  name="bio"
                  value={bio}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="Tell us more about yourself"
                />

                <div className="mb-3">
                  <button 
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }} 
                    className="btn btn-light"
                    >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                  { socialInputs }
                  <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
              </form>

              <small className="d-block pb-3"> * Required fields</small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))
