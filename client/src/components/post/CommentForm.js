import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFiledGroup from '../commons/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      errors: {}
    }
  }

  componentWillReceiveProps(newProps) {

    if(newProps.errors) {
      this.setState({errors: newProps.errors});
    }
  }

  onChange = e => this.setState({[e.target.name]:e.target.value});

  onSubmit = e => {
    e.preventDefault();
   
    const { name, avatar } = this.props.auth.user;
    const { text } = this.state;
    const { postId } = this.props;

    const newComment = { text, name, avatar }

    this.props.addComment(postId, newComment);
    this.setState({text: ''});
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">
          Make a Comment...
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <TextAreaFiledGroup 
                placeholder="Reply to Post"
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

CommentForm.propTypes = {
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { addComment })(CommentForm);
