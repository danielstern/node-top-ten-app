let React = require('react');
let post = require('./../restHelper.js').post;
let userActions = require('./../actions/userActionCreator.js');

module.exports = React.createClass({
	handleLogout(e){
		e.preventDefault();
		post('/logout')
		.then(function(){
			userActions.logout();
		});
	},
	render(){
		return (
			<form className="auth" onSubmit={this.handleLogout}>
				<h3>Welcome, {this.props.user.username}</h3>
				<input type="submit" value="Log Out?" />
			</form>
		)
	}
})
