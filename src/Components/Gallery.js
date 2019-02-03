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
import queryString from 'query-string';
import Card from './Card.js';
let API_KEY = '23f0c20257f488a933cf3d70c2887e3b';
class Gallery extends React.Component{
    constructor(props){
        super(props);
        this.state={
            images:[]
        };
    }
    componentWillMount(){
        let qs = queryString.parse(this.props.location.search);
         console.log('qs is',qs);
         this.loadData(qs.id);


    }

    loadData = async(id={})=>{

        let url=`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=${API_KEY}&group_id=481450@N20&format=json&nojsoncallback=1`;
        console.log('url is',url);
        //https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=23f0c20257f488a933cf3d70c2887e3b&group_id=481450%40N20&page=10&format=rest&api_sig=9ab36cd0004ef11b80e5d94ef0281aae
        const api_call = await fetch(url);
        const result = await api_call.json();
        console.log('gullyboy',result);
         let data=[];
         for(let i=0;i<result.photos.photo.length;i++){
             var photo=result.photos.photo[i];
             let uri = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
             data=[...data,uri];
         }
         this.setState({
            images:data
        });
  }


    render(){
        console.log('this.state.images',this.state.images);
        return(
          <div>

             <h1>This is gallery </h1>
             {
                 this.state.images.length>0 ?
                 this.state.images.map(item => {
                            return (
                                <Card
                                    data={item}
                                    loadData={this.loadData}
                                />
                            );
                        }):null
             }

          </div>

        );
    }
}
export default Gallery;
