import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import {setEndDate, setStartDate, sortByCost, sortByDate} from '../Redux/Actions/Filter';
import { editItem } from '../Redux/Actions/Items';
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
        this.getNewCount = this.getNewCount.bind(this);
    }

    onDatesChange= ({startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
        this.TimesAmountChange();
    };

    TimesAmountChange = () =>{
        this.props.Items.map((item)=>{
            let times = 1;
            if(item.recurring){
                const duedate = moment(item.duedate);
                let recurringsize = item.recurringsize;
                const endrecurring = moment(this.props.Filter.endDate);
                if(item.enddate){
                    const endR = moment(item.endrecurring);
                    if(endR.isBefore(endrecurring))
                        recurringsize = endR;
                } 
                times = this.getNewCount(duedate, endrecurring, recurringsize);     
                console.log('yes');  
                
            }
            this.props.dispatch(editItem(item.name, {times: times}));
        });
    }

    getNewCount = (duedate, endrecurring, recurringsize) =>{
        switch(recurringsize){
            case 'daily':
                console.log('daily'); 
                return (endrecurring.diff(duedate, 'days'));
            case 'weekly':
                console.log('weekly'); 
                return 1;
            case 'biweekly':
                console.log('biweekly'); 
                return 1;
            case 'monthly':
                console.log('monthly'); 
                return 1;
            default:
                console.log('default'); 
                return 1;
        }
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
        Filter: state.filter,
        Items: state.items
    }
}

export default connect(MapUserInfo)(FilterPicker);