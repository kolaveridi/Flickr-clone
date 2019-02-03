import React, { Component } from 'react';
import logo from './logo.svg';
import ListGroups from './Components/ListGroups';
import './App.css';
let API_KEY = '23f0c20257f488a933cf3d70c2887e3b';

class App extends Component {
   constructor(props){
       super(props);
       this.state={
           response:[],
           total:'',
           group:''
       }
   }
   onChangeGroup =(event)=>{
       this.setState({
           group:event.target.value
       })
   }
   onChangeTotal =(event)=>{
       this.setState({
           total:event.target.value
       })
   }
   onSubmit =(event)=>{
       event.preventDefault();
       const {group,total}=this.state;
       this.loadData(group,total);
   }
   loadData = async(group,total)=>{
       console.log('group',group,total);
       let url=`https://api.flickr.com/services/rest/?method=flickr.groups.search&api_key=${API_KEY}&text=mountains&per_page=30&format=json&nojsoncallback=1`;
       console.log('url',url);
       const api_call = await fetch(url);
       const result = await api_call.json();
       console.log('result',result);
       this.setState({
           response:result.groups.group.map(item=>({
               name:item.name,
               members:item.members,
               _id:item.nsid,
               pool_count:item.pool_count,
               iconserver:item.iconserver,
               topic_count:item.topic_count
           }))
       });
   }
  render() {
      console.log('response',this.state.response);
    return (
      <div className="App">
          <h1>Flickr Clone </h1>
          <form   onSubmit ={this.onSubmit }>

             <div className="form-container">
                <input

                   onChange ={(event)=>this.onChangeGroup(event)}
                   placeholder='Groups'
                   value ={this.state.group}
                   required={true}
                   name='group'
                 />
                 <input
                   className="input-container"
                   onChange ={(event)=>this.onChangeTotal(event)}
                   placeholder='Total'
                   value ={this.state.total}
                   name='total'
                  />
                  < button
                   className="button"

                  type="submit"
                  >Submit </button>

                </div>
            </form>
            <ListGroups data={this.state.response}/>


      </div>
    );
  }
}

export default App;
