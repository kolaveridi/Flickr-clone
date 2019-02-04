import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import {
  withRouter
} from 'react-router-dom'
import GroupStyle from'./GroupStyle.css';

class Group extends React.Component{
    onClick=(id)=>{
        this.props.history.push({
                pathname: '/gallery',
                search: '?id='+id
    })
}

    render(){
        const {name,members,pool_count,_id}=this.props.data;
        return(
            <div className="groups" onClick={()=>this.onClick(_id)}>
              <h4>{name} </h4>
              <h4>Members:{members}</h4>
              <h4>Poll_count: {pool_count}</h4>

            </div>
        )
    }
}
export default withRouter(Group);
