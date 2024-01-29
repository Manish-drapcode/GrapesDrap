import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import './LS.css';
class Login extends Component{

constructor(props){
super(props);
this.state={
    name:'',
    password:'',
    log:true,
};
}


handleChange=(event)=>{
    console.log(this.props);
    const {name,value} = event.target;
    this.setState({[name]:value});
}
handleSubmit= async(event)=>{
    event.preventDefault();
    const url = 'http://localhost:3003/user/login';
    this.setState({log:true})
    const data ={
username:this.state.name,
userpassword:this.state.password,
    }
    try{
        const response = await axios.get(url,{params:data});
        
        if(response){
            localStorage.setItem('user', JSON.stringify(response.data));
            console.log(response.data);
            this.props.history.push('/dashboard');
        }
    }
    catch(error){
        console.log(error);
    }
}




    render(){
        console.log("this is props ",this.props)
        return(<div className="Login">
        <header className="Login-header">
        <div>Login</div>
        <div> 
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Name : </label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} ></input> <br />
            <label>Password:  </label>
            <input type="password" name ="password" value={this.state.password} onChange={this.handleChange}></input><br />
            <button type ="Submit" className ="btn">Login</button>
            </form>
            <Link to='/dashboard'>Dashboard</Link>
            </div> 
        
           
           
    
        </div>
        </header>
        </div>)
    }
}
export default Login;