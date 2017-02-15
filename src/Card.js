import React, { Component } from 'react';
import './css/Card.css';

export default class Card extends Component{
	constructor(props) {
	    super(props);
	    this.delete = this.delete.bind(this);	
	    this.handleUpdate = this.handleUpdate.bind(this);
	    this.onDragStart = this.onDragStart.bind(this);
	    this.onDragOver = this.onDragOver.bind(this);
	    this.state = {
	    	description: this.props.description,
	    	username: this.props.username,
	    	status: this.props.status,
	    	update: false
	    }
	}
	onDragStart(e){
  	var obj = {
  		cardid: e.target.id,
  		listid: e.target.title
  	}
    e.dataTransfer.setData('text', JSON.stringify(obj)); 

  }
  onDragOver(e){
  	e.preventDefault();
  }
	updateDescription(e){
		e.preventDefault();
		var description=e.target.value;
		this.setState({
			description: description
		});
	}
	updateUsename(e){
		e.preventDefault();
		var username=e.target.value;
		this.setState({
			username: username
		});
	}
	updateStatus(e){
		e.preventDefault();
		var status=e.target.value;
		this.setState({
			status: status
		});
	}
	handleUpdate(e){
		e.preventDefault();
		var updateObj = this.state;
		this.setState({
			update: false
		});
		this.props.handleUpdate(updateObj,this.props.cardid,this.props.listid);
	}
	delete(e){
    e.preventDefault();
    alert("This will delete the card!! Proceed ?");
    this.props.handleDelete(e.target.title, e.target.id);
  }
  updateToggle(e){
  	e.preventDefault();
  	this.setState({
			update: true
		});
  }
	render() {
		const { description, username, status, cardid, listid } = this.props;
		const deleteCard = require('./Images/deleteIcon.png');
		const edit = require('./Images/edit.png');
		return(
			<div className="cardWrapper" id={cardid} title={listid} draggable='true' onDragOver={this.onDragOver} onDragStart={this.onDragStart}>
				<div className="bar">
				  <img src={deleteCard} id={cardid} title={listid} alt="delete" className="deleteMe" onClick={this.delete}/>
				  <img src={edit} id={cardid} title={listid} alt="update" className="updateMe" onClick={this.updateToggle.bind(this)}/>
				</div>
				{ 
					this.state.update ? 
					<form className="updateForm" onSubmit={this.handleUpdate}>
						<label>Description</label><br/>
						<input type="text" value={this.state.description} id="description" onChange={this.updateDescription.bind(this)} /><br/>
						<label>UserName</label><br/>
						<input type="text" value={this.state.username} id="username" onChange={this.updateUsename.bind(this)} /><br/>
						<label>Status</label><br/>
						<input type="text" value={this.state.status} id="status" onChange={this.updateStatus.bind(this)} /><br/>	
						<button type="submit" onClick={this.handleUpdate}>UPDATE</button>
					</form> :
					<div> 
						<div className="description"><div className="heading-span">Description: </div>{ description }</div>
						<div className="username"><div className="heading-span">Username: </div>{ username }</div>
						<div className="status"><div className="heading-span">Status: </div>{ status }</div>
					</div>
				}
			</div>
		)
	}
}
