import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
	render() {
		const { user, skills, bio } = this.props.profile;
		const skillsContent = skills.map((skill, i) => (
			<div key={i} className="p-3">
				<i className="fa fa-check" />
				{skill}
			</div>
		));

		const firstName = user.name.trim().split(' ')[0];

		return (
			<div className="row">
				<div className="col-md-12">
					<div className="card card-body bg-light mb-3">
						{isEmpty(bio) ? null : (
							<Fragment>
								<h3 className="text-center text-info">{firstName}'s Bio</h3>
								<p className="lead text-center">{bio}</p>
								<hr />
							</Fragment>
						)}

						<h3 className="text-center text-info">Skill Set</h3>
						<div className="row">
							<div className="d-flex flex-wrap justify-content-center align-items-center">
								{skillsContent}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ProfileAbout.prototypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileAbout;
