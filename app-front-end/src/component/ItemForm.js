import React from 'react';
import { TaskNameAvailability } from '../ApiMethods/Account';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

const now = moment();

class ItemForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:{
                value: props.item? props.item.name :'',
                valid: props.item? true :false,
                error:''
            },
            cost:{
                value: props.item? props.item.cost/ 100 :'',
                valid: props.item? true :false,
                error:''
            },
            description:{
                value: props.item? props.item.description :'',
                valid: props.item? true :false,
                error:''
            },
            duedate: props.item? moment(props.item.duedate) : moment(),
            CalFocuse: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit= (e) => {
        e.preventDefault();       
        if(this.state.name.valid || this.state.cost.valid || !!this.state.description.value){
            this.props.onSubmit ({
                "name":  this.state.name.value,
                "cost": this.state.cost.value*100,
                "description":this.state.description.value,
                "userName": this.props.User.username,
                "duedate": this.state.duedate.format("YYYY-MM-DD")
            });
        }
    }

    NameChange = (e) =>{
        const name = e.target.value;
        if(name.length >2){
            TaskNameAvailability(name).then(response =>
                {                  
                    if(response.available){
                        this.setState(() => ({name:{
                            value: name,
                            valid: true,
                            error: ''
                        }}));
                    }
                    else{
                        this.setState(() => ({name:{
                            value: name,
                            valid: false,
                            error:'You already have a Task with this name'
                        }}));
                    }

                });

        }
        else{
            this.setState(() => ({name:{
                value: name,
                valid: false,
                error:'Must be Length 3'
            }}));
        }
    }

    CostChange = (e) =>{
        const cost = e.target.value;
        if(!cost || cost.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(() => ({cost: {
                value: cost,
                valid: true,
                error:''
            }}));
        }
        else{
        }
    }

    descriptionChange = (e) =>{
        const description = e.target.value;
        this.setState(() => ({description:{
            value: description
        }}));
    }

    onDateChange= (duedate)=>{
        this.setState(()=>({
            duedate: duedate
        }))
    };

    onFocusChange=(focused)=>{
        this.setState(()=>({
            CalFocuse: focused.focused
        }))
    }

    render= () =>(
        <div>
            <form  onSubmit= {this.onSubmit}>
            <label >Name:</label>
            <input type = "text" placeholder="Name" name = "Name"  id="name" value = {this.state.name.value} onChange = {this.NameChange} /> 
            {!!this.state.name.error && this.state.name.error}
            <br/>
            <label >Amount:</label>
            <input type = "number" placeholder="Amount" name = "Cost" id="cost" value = {this.state.cost.value} onChange = {this.CostChange} />
            <br/>
            <SingleDatePicker date ={this.state.duedate} onDateChange={this.onDateChange} focused = {this.state.CalFocuse} onFocusChange={this.onFocusChange} numberOfMonths={1} isOutsideRange={()=> false}/>
            <br/>
            <label >description:</label>
            <input type = "text" name = "Description"  id= "description" value = {this.state.description.value} onChange = {this.descriptionChange} placeholder="description (Optional)"/>      
            <br/>   
            <button className= "button">Submit</button>
            </form>
        </div>
    );

}

const MapUserInfo=(state)=>{
    return{
        User: state.user.currentUser
    }
  }

export default connect(MapUserInfo)(ItemForm);
