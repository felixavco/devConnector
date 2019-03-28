import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';


class Landing extends Component {
  render() {
    const authLinks = (
      <Link to="/dashboard" className="btn btn-lg btn-info mr-2">Go to Dashboard</Link>
    )

    const guestLinks = (
      <Fragment>
        <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
        <Link to="/login" className="btn btn-lg btn-light">Login</Link>
      </Fragment>
    )

    const { isAuthenticated } = this.props.auth

    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4 text-white">
                  The community of Developers
                </h1>
                <p className="lead text-white"> Create a developer profile/portfolio, share posts and get help from other developers</p>
                <hr />
                { isAuthenticated ? authLinks : guestLinks }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Landing)
