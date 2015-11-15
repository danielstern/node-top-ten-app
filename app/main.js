"use strict";
let React = require('react');
let ReactDOM = require('react-dom');
let $ = require('jquery');
let post = require('./restHelper.js').post;
let get = require('./restHelper.js').get;
let userActions = require('./actions/userActionCreator.js');
let userStore = require('./stores/userStore.js');

let listStore = require('./stores/listStore.js');
let lists = [];
listStore.onChange(function(_list){
	lists = _list
	render();
});

let LoginForm = React.createClass({
	handleLogin(e){
		e.preventDefault();
		post('/login',this.state)
		.then(function(g){
			console.log("Logged in?",g);
			if (g) {
				userActions.login(g);
			}
		})
	},
	getInitialState(){
		return {
			username:"guest",
			password:"test"
		}
	},
	handleNameChange(e){
		this.setState({username : e.target.value})
	},
	handlePasswordChange(e){
		this.setState({password : e.target.value})
	},
	render(){
		return (
			<form className="auth" onSubmit={this.handleLogin}>
				<h3>Please sign in to see your top ten list</h3>
				<input type="text" autoFocus="true" placeholder="Username" value={this.state.username} onChange={this.handleNameChange}/>
				<input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
				<input type="submit" value="Log In" />
			</form>
		)
	}
})

let LogoutForm = React.createClass({
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
				<h3>Logout</h3>
				<input type="submit" value="Log Out" />
			</form>
		)
	}
})

let TopTenList = React.createClass({
	getDefaultProps(){
		return {
			user:null
		}
	},
	componentDidMount(){

	},
	render(){
		return (
			<div>
				<h1>My Top Ten List</h1>
				{this.props.user ? <LogoutForm /> : <LoginForm />}
				{this.props.lists.map((list, index)=>{
					return list.map((item, index)=>{
							return (
						 		<div key={"key-"+index}>
									{item.name}
								</div>
							)
						})}
					)
				}
			</div>
		)
	}
})

let user = userStore.getUser();

userStore.onChange((_user)=>{
	user = _user;
	render();
});

function render(){
	ReactDOM.render(<TopTenList user={user} lists={lists} />, appMount);
}
render();
//
//if (user) {
//	get('api/items')
//	.then(function(f){
//		console.log(f);
//	})
//}


console.info("App init");
