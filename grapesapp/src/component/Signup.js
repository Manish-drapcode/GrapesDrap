import React, {Component} from 'react';
import axios from 'axios';

class Signup extends Component{

    constructor(props){
        super(props);
        this.state={
            name:"",
            email:"",
            password:"",
            log:false,
        }
    };


 handleChange=(event)=>{
const {name,value}= event.target;
        this.setState({[name]:value});
    }

handleSubmit = async(event)=>{
    event.preventDefault();
    this.setState({log:true});

    const url = 'http://localhost:3003/user/Signup';
const data={
    username : this.state.name,
useremail:this.state.email,
userpassword:this.state.password,
};    
    try{
const response = await axios.post(url,data); 
console.log(response.data);
if(response){
    localStorage.setItem('user', JSON.stringify(response.data));
    this.props.history.push('/Dashboard');
}

    }
    catch(error){
        console.log(error);
    }
    
}


    render(){

        return(<div className="Login">
    <header className="Login-header">
    <div>Login</div>
    <div> 
      { this.state.log && (<div>
      <form onSubmit={this.handleSubmit}>
        <label>Name: </label>
        <input type="text" name="usename" value={this.state.name} onChange={this.handleChange} ></input> <br />
        <label>Email :</label>
        <input type="text" name="useremail" value={this.state.email} onChange={this.handleChange} /> <br />
        <label>Password:  </label>
        <input type="password" name ="password" value={this.state.password} onChange={this.handleChange}></input><br />
        <button type ="Submit" className ="btn">Submit</button>
        </form>
        </div>) 
        }
       
        {!this.state.log &&(
          <div>
            <h1>Welcome to page of coders</h1>
          </div>
        )}

    </div>
    </header>
    </div>)
    }
}
export default Signup;