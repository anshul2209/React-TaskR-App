import React, { Component } from 'react';
import './css/Header.css';

export default class Header extends Component {
	constructor(props) {
    super(props);
    this.addList = this.addList.bind(this);
  }
	addList(e){
		e.preventDefault();
		this.props.handleListAdd();
	}
	render() {
		return (
			<div className="headerWrapper">
				<div className="companyTitle">TASKR</div>
				<div className="navRight">
					<div className="add" onClick={this.addList}>
					  <button type="button" className="addList">Create New List</button>
					</div>
				</div>
			</div>
		);
	}
}