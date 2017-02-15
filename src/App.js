import React, { Component } from 'react';
import Header from './Header';
import List from './List';
import './css/App.css';

const dummydata = [{
    "title": "List 1",
    "id": "78ssv615bla8hbti96bt9",
    "cards": [{
        "description": "Description 1",
        "username": "Dark Knight",
        "status": "New",
        "id": "3xwzwlgi78a5m0tpam7vi"
      },
      {
        "description": "Description 2",
        "username": "Username 2",
        "status": "Completed",
        "id": "52w6xcc2xzufq9nqaor"
      }
    ]
  }, {
    "title": "List 2",
    "id": "o6xf49utw5074lma38fr",
    "cards": [{
        "description": "Add Description",
        "username": "Flash",
        "status": "Completed",
        "id": "uewr401gk53x7n7phkt9"
      },
      {
        "description": "Description 3",
        "username": "Add Username",
        "status": "Completed",
        "id": "1rvz6lbcr6d7cu1ikvs4i"
      },
      {
        "description": "Add Description",
        "username": "Batman",
        "status": "New",
        "id": "1j443sw99w7p0gimjkyb9"
      }
    ]
  }];
var lists = JSON.parse(localStorage.getItem('lists')) || dummydata;
class App extends Component {
	constructor(props) {
    super(props);
    this.state = {lists: lists};
    this.handleListAdd = this.handleListAdd.bind(this);
    this.addCard = this.addCard.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleListDelete = this.handleListDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  preventDefault(e){
    e.preventDefault();
  }

  drop(event) {
    var id = event.dataTransfer.getData('text');
    var obj = JSON.parse(id);
    var foundcard;
    const l_id = obj.listid;
    const c_id = obj.cardid;
    const listData = lists;
    for (var i=0;i<listData.length;i++){
      const list = listData[i];
      if(list.id === l_id){
        for(var j=0;j<list.cards.length;j++){
          const card = list.cards[j];
          if(card.id === c_id){
              foundcard = card;
              break;
          }
        }
      }
    }
    this.addCard(foundcard,event.currentTarget.id);
    this.handleDelete(obj.listid, obj.cardid);

  }
  handleListUpdate(title,listid){
  	const l_id = listid;
  	const listData = lists;
  	for(var j=0;j<listData.length;j++){
		const list = listData[j];
		if(list.id === l_id){
			list.title = title;
		break;
		}
	}
	localStorage.setItem('lists', JSON.stringify(listData));
    this.setState((prevState) => ({
      lists: listData,
    }));
  }
  handleUpdate(updateObj,cardid,listid){
  	const l_id = listid;
  	const c_id = cardid;
  	const listData = lists;
  	for (var i=0;i<listData.length;i++){
  		const list = listData[i];
  		if(list.id === l_id){
  			for(var j=0;j<list.cards.length;j++){
  				const card = list.cards[j];
  				if(card.id === c_id){
  					card.description = updateObj.description;
  					card.username = updateObj.username;
  					card.status = updateObj.status;
        			break;
  				}
  			}
  		}
  	}
    localStorage.setItem('lists', JSON.stringify(listData));
    this.setState((prevState) => ({
      lists: listData,
    }));
  }
  handleListDelete(listid){
  	const l_id = listid;
  	const listData = lists;
  	for(var j=0;j<listData.length;j++){
		const list = listData[j];
		if(list.id === l_id){
			listData.splice(j,1);
		break;
		}
	}
	localStorage.setItem('lists', JSON.stringify(listData));
    this.setState((prevState) => ({
      lists: listData,
    }));
  }
  handleDelete(listid,cardid){
  	const l_id = listid;
  	const c_id = cardid;
  	const listData = lists;
  	for (var i=0;i<listData.length;i++){
  		const list = listData[i];
  		if(list.id === l_id){
  			for(var j=0;j<list.cards.length;j++){
  				const card = list.cards[j];
  				if(card.id === c_id){
  					list.cards.splice(j,1);
        			break;
  				}
  			}
  		}
  	}
    localStorage.setItem('lists', JSON.stringify(listData));
    this.setState((prevState) => ({
      lists: listData,
    }));
  }
  handleListAdd() {
    var newList=lists;
    var list = {
      title: 'List Title',
      id: Math.random().toString(36).substring(7),
      cards: []
    };
    newList.push(list);
    localStorage.setItem('lists', JSON.stringify(newList));
    this.setState((prevState) => ({
      lists: newList
    }));
  }
  addCard(card,listid) {
  	const listData = lists;
    for(var i=0; i<listData.length;i++){
    	const listNumber = listData[i];
    	if(listNumber.id === listid){
    		const cards = listNumber.cards;
    		cards.push(card);
    		listNumber.cards = cards;
    		break;
    	}else {
    		console.log('could not find the list with such id', listid, lists);
    	}
    }
    localStorage.setItem('lists', JSON.stringify(listData));
    this.setState((prevState) => ({
        lists: listData
      }));
  }
	render() {
		const ListData = this.state.lists.map((list) => {
			return (
				<div key={list.id} id={list.id} className="list_wrapper" onDragOver={this.preventDefault.bind(this)} onDrop={this.drop.bind(this)}>
					<List handleListUpdate={this.handleListUpdate.bind(this)} handleUpdate={this.handleUpdate} handleListDelete={this.handleListDelete} handleDelete={this.handleDelete} addCard={this.addCard} listid={list.id} title={list.title} cards={list.cards}/>
				</div>
			);
		})
		return (
			<div className="App">
				<Header handleListAdd={this.handleListAdd.bind(this)}/>
				<div className="App-body">
					{ ListData }
				</div>
			</div>
		);
	} 
}
export default App;