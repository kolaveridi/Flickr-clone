import React, { Component } from 'react';
import Group from './Group.js';
class ListGroups extends React.Component {
    constructor(props){
        super(props);
        this.state={
           chartdata:[]
        };
    }
    render(){
        return (
         <div>
          <h1>THis is working </h1>
              {
                  this.props.data && this.props.data.map(item=>{
                      return(
                          <Group
                             key={item._id}
                             data={item}
                             />
                      )
                  })
              }
          </div>
      );
    }


}
export default ListGroups;
