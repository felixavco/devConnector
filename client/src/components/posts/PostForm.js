import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFiledGroup from '../commons/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      errors: {}
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.error) {
      this.setState({errors: newProps.errors});
    }
  }

  onChange = e => this.setState({[e.target.name]:e.target.value});

  onSubmit = e => {
    e.preventDefault();
   
    const { name, avatar } = this.props.auth.user;
    const { text } = this.state;
    const newPost = { text, name, avatar }

    this.props.addPost(newPost);
    this.setState({text: ''});
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">
          Say Somthing...
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <TextAreaFiledGroup 
                placeholder="Create a post"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
              />
            </div>
            <button type="submit" className="btn btn-dark">Submit</button>
          </form>
        </div>
      </div>
    </div>
    )
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { addPost })(PostForm);
