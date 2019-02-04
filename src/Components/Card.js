import React, { Component } from 'react';
import Cardstyling from './Cardstyling.css';
class Card extends React.Component{

    saveContainerRef = (node) => {
        window.temp = node;
        this.container = node;
    };
    componentDidMount() {
        window.addEventListener('scroll', this.loadMoreData);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadMoreData);
    }
    loadMoreData = () => {
        let details = this.container.getBoundingClientRect();

        let current = (details.top * -1) + window.innerHeight;

        if(current > details.height) {
            this.props.loadData();

        }
    }
    render(){
        console.log('jagga',this.props.data);
        const {title,ownername,uri}=this.props.data;
        return(
            <div className="images" ref={this.saveContainerRef}>
             <div className="image-conatiner">
                   <h6>{ownername} </h6>
                    <h6>{title} </h6>
             </div>    
                   <img src={uri}/>

            </div>
        )
    }
}
export default Card;
