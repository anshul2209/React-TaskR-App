import React, { Component } from 'react';
import Card from './Card';
import './css/List.css';

export default class List extends Component {
	constructor(props) {
    super(props);
    this.handleAddCard = this.handleAddCard.bind(this);
    this.handleListDelete = this.handleListDelete.bind(this);
    
    this.state = {
    	title: this.props.title,
    	listUpdate: false
    }
  }
  handleListDelete(e){
  	e.preventDefault();
  	this.props.handleListDelete(e.target.id);
  }
  handleListUpdate(e){
  	e.preventDefault();
  	const title = this.state.title;
  	this.setState({
		listUpdate: false
	});
  	this.props.handleListUpdate(title,this.props.listid);
  	
  }
  updateTitle(e){
	e.preventDefault();
	var title=e.target.value;
	this.setState({
		title: title
	});
  }
  listUpdateToggle(e){
  	this.setState({
		listUpdate: true
	});
  }
  handleAddCard() {
    var card = {
      description: 'Add Description',
      username: 'Add Username',
      status: 'New',
      id: Math.random().toString(36).substring(7)
    };
    this.props.addCard(card,this.props.listid);
  }
	render() {
		const { title, cards,listid } = this.props;
    const deleteIcon = require('./Images/deleteIcon.png');
		const cardsData = cards.map((card)=>{
			return (
			  <Card key={card.id} handleUpdate={this.props.handleUpdate} handleDelete={this.props.handleDelete} listid={listid} cardid={card.id} description={card.description} username={card.username} status={card.status} />	
			);
		});
		return(
			<div>
				<div className="header-Wrapper">
					{ 
						this.state.listUpdate ? 
						<form className="updateTitleForm" onSubmit={this.handleListUpdate.bind(this)}>
							<input type="text" value={this.state.title} id="description" onChange={this.updateTitle.bind(this)} /><br/>
							<button type="submit" onClick={this.handleListUpdate.bind(this)}>UPDATE</button>
						</form> :
						<div className="title" onClick={this.listUpdateToggle.bind(this)}>
							{ title }
						</div>
					}
					<div className="addcard" onClick={this.handleAddCard}>Add Task</div>
					<div className="deletelist" id={listid} onClick={this.handleListDelete}><img id={listid} src={deleteIcon} alt="delete"/></div>
				</div>
				<div className="description"></div>
				<div className="cardsWrapper">
					{cardsData}
				</div>
			</div>
		);
	}
}

				











