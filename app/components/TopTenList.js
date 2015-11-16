"use strict";

let React = require('react');
let LoginForm = require('./LoginForm.js');
let LogoutForm = require('./LogoutForm.js');

module.exports = React.createClass({
	getDefaultProps(){
		return {
			user:null,
			items:[]
		}
	},
	render(){

		return (
			<div>

				{this.props.user ? <LogoutForm user={this.props.user} /> : <LoginForm />}
				<h1>{this.props.name}</h1>
				{this.props.items.map((item, index)=>{
					return (
						<div key={"key-"+index}>
							{item.name}
						</div>
					)
				})}				
		</div>
		)
	}
})
