import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';


class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  render(){
    return (
      <div className="chart">

      <Pie
        data={this.props.data}
        options={{maintainAspectRatio: false}}/>
      </div>
    )
  }
}

export default Chart;
