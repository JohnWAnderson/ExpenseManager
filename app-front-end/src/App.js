import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Account/Login';
import Signup from './Account/Signup';
import Header from './component/Header';
import NotFound from './component/NotFound';
import AddPage from './component/AddPage';
import EditPage from './component/EditPage';
import { getCurrentUser, ACCESS_TOKEN, GetItems } from './ApiMethods/Account';
import PrivateRoute from './component/PrivateRoute';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { addUser, removeUser } from './Redux/Actions/Users';
import { addItem, clearItems } from './Redux/Actions/Items';
import { resetFilter } from './Redux/Actions/Filter';
import DatePicker from './component/DatePicker'
class App extends React.Component {
  constructor(props) {   
    super(props);  
    this.handleLogOn=this.handleLogOn.bind(this);
    this.loadCurrentUser=this.loadCurrentUser.bind(this);
    this.handleLogOut=this.handleLogOut.bind(this);
    this.loadItems=this.loadItems.bind(this);
  }
  
handleLogOn=()=>{
  this.loadCurrentUser();
  this.loadItems();
}

  loadCurrentUser=()=> {
    getCurrentUser()
    .then(response => {
        this.props.dispatch(addUser({currentUser: response, isAuthenticated: true}))
    })
  };

  handleLogOut=()=>{
    localStorage.removeItem(ACCESS_TOKEN);
    this.props.dispatch(removeUser());
    this.props.dispatch(clearItems());
    this.props.dispatch(resetFilter());
}

loadItems = () =>{
  GetItems().then(response => {     
      for (const item of response.content) {
        this.props.dispatch((addItem(item)))
      }
  });
}
  

  render=()=>(
    <BrowserRouter>
        <div>
            <Header handleLogOut= {this.handleLogOut}/>
            <Switch>
                <Route path="/" component = {DatePicker} exact={true}/>
                <Route path="/signup" component= {Signup} exact={true}/>
                <Route path="/login" component= {(props) =><Login {...props} handleLogOn={this.handleLogOn}/>}  exact={true}/> 
                <Route path="/edit/:id" component= {EditPage}/>
                <PrivateRoute path="/add" component={AddPage} isAuthenticated={this.props.User.user.isAuthenticated}/> 
                <Route component= {NotFound}/>
            </Switch>
        </div>
      </BrowserRouter>
  );
};

const MapUserInfo=(state)=>{
  return{
      User: state
  }
}
export default connect(MapUserInfo)(App);