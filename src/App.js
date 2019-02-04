import React, { Component } from 'react';
import logo from './logo.svg';
import ListGroups from './Components/ListGroups';
import './App.css';
import Chart from './Components/Chart.js';
let API_KEY = 'ec5ed7f7ffca85d7347031e853bf38eb';
function generateColor(){
    var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    return  hue;
}

class App extends Component {
   constructor(props){
       super(props);
       this.state={
           response:[],
           total:'',
           group:'',
           error:'false',
           chartData:{},
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
           response:result && result.groups && result.groups.group && result.groups.group.map(item=>({
               name:item.name,
               members:item.members,
               _id:item.nsid,
               pool_count:item.pool_count,
               iconserver:item.iconserver,
               topic_count:item.topic_count
           }))

       });
       let labelData=[];
       let datainarray=[];
       let backgroundColor=[
                     'rgba(255,105,145,0.6)',
                     'rgba(155,100,210,0.6)',
                     'rgba(90,178,255,0.6)',
                     'rgba(240,134,67,0.6)',
                     'rgba(120,120,120,0.6)',
                 ];
       for(let i=0;i<5;i++){
           let item=result.groups.group[i];
           labelData.push(item.name);
            datainarray.push(item.pool_count);
            backgroundColor.push(generateColor());
       }





       this.setState({
      chartData:{
        labels: labelData,
        datasets:[
          {
            label:'Population',
            data:datainarray,
            backgroundColor:backgroundColor
          }
        ]
      }
    });
   }
  render() {
      //console.log('hue',hue);
      console.log('response',this.state.response);
      console.log('chartData',this.state.chartData);
    return (
 <div >
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
            <ListGroups data={this.state.response} chartData={this.state.chartData}/>
      </div>
       <Chart data={this.state.chartData}/>
      </div>
    );
  }
}

export default App;
