import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import {setEndDate, setStartDate, sortByCost, sortByDate} from '../Redux/Actions/Filter';
import moment from 'moment';

class FilterPicker extends React.Component{
    constructor(props){
        super(props);   
        this.state={
            CalFocuse: null
        };
        this.onFocusChange = this.onFocusChange.bind(this);
        this.onDatesChange = this.onDatesChange.bind(this);
    }

    onDatesChange= ({startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };

    onFocusChange = (CalFocuse) =>{
        this.setState(()=>({CalFocuse}))
    };

    render(){     
        return(
            <div>
            <select value={this.props.Filter.sortBy} onChange={(e) => {
                if(e.target.value === 'date'){
                    this.props.dispatch(sortByDate());
                }
                else if(e.target.value === 'cost'){
                    this.props.dispatch(sortByCost());
                }
            }}>
            <option value="cost">cost</option>
            <option value ="date">Date</option>
            </select>
            <DateRangePicker
            startDateId="start_date_input"
            endDateId="end_date_input"
            startDate={moment(this.props.Filter.startDate)}
            endDate={moment(this.props.Filter.endDate)}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.CalFocuse}
            onFocusChange={this.onFocusChange}
            showClearDates={true}
            numberOfMonths={2} 
            isOutsideRange={()=> false}/>
             </div>
        );
    };
}

const MapUserInfo=(state)=>{
    return{
        Filter: state.filter
    }
}

export default connect(MapUserInfo)(FilterPicker);