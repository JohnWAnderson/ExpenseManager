import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import {setEndDate, setStartDate, sortByCost, sortByDate} from '../Redux/Actions/Filter';
import { editItem } from '../Redux/Actions/Items';
import {TimesItemChange} from '../Redux/TimesChange';
import moment from 'moment';

class FilterPicker extends React.Component{
    constructor(props){
        super(props);    
        this.state={
            CalFocuse: null
        };
        this.onFocusChange = this.onFocusChange.bind(this);
        this.onDatesChange = this.onDatesChange.bind(this);
        this.TimesAmountChange = this.TimesAmountChange.bind(this);
    }

    onDatesChange= ({startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
        this.TimesAmountChange(startDate, endDate);
    };

    TimesAmountChange = (startDate, endDate) =>{
        this.props.Items.map((item)=>{
            //console.log(TimesItemChange(item, {startDate, endDate}));
            this.props.dispatch(editItem(item.name, {times: TimesItemChange(item, {startDate, endDate})}));
        })
    };

    onFocusChange = (CalFocuse) =>{
        this.setState(()=>({CalFocuse}))
    };

    render(){     
        return(
            <div>
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
        Filter: state.filter,
        Items: state.items
    }
}

export default connect(MapUserInfo)(FilterPicker);