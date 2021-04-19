import React from "react";
import '../App.css';

//Regex Expression - used to validate email as a real email
const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

// INTERFACES
interface SignUpProps {
    name?: any;
    value?: any;
 }
 interface SignUpState {
    email : string,
    password : string,
    errors : {
       email : string,
       password : string
    }
 }

export class RegisterForm extends React.Component<SignUpProps, SignUpState>{

    //handle Change Function
    handleChange = (event : any) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
          case 'email':
             errors.email = Regex.test(value)? '': 'Email is not valid!';
             break;
          case 'password':
             errors.password = value.length < 7 ? 'Password must be at least 7 characters long!': '';
             break;
          default:
            break;
        }
      this.setState(Object.assign(this.state, { errors,[name]: value }));
      console.log(this.state.errors);
      }

    //handleSubmit Function
    handleSubmit = (event : any) => {
        event.preventDefault();
        let validity = true;
        Object.values(this.state.errors).forEach(
            (val) => val.length > 0 && (validity = false)
        );
        if(validity === true){
            console.log("User Successfully Registered!");
            fetch("http://localhost:3000/user/register/", {
            method: "POST",
            body: JSON.stringify({
            email: this.props.value, password: this.props.value ,
            }),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          })
            .then((response) => response.json())
            .then((data) => {
            //   this.props.updateToken(data.sessionToken);
            //   this.props.updateEmail(data.user.email);
              console.log(data.user.email);
            //   history.push('/where you want it to stay ?');
            })
            .catch(err=> console.log(err));
        }else{
            console.log("Unable to Register User - Please Try Again!")
        }
    }

    //Constructor
    constructor(props: SignUpProps) {
        super(props);
        const initialState = {
           email : '',
           password : '',
           errors : {
             email : '',
             password : ''
           } 
         }
         this.state = initialState;
         this.handleChange = this.handleChange.bind(this);
   }

    render() {
        const {errors} = this.state    
        return (
         <div className='wrapper'>
           <div className='form-wrapper'>
              <h2>Sign Up</h2>
              <form onSubmit={this.handleSubmit} noValidate >
                 <div className='emailAddress'>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input type='text' name='emailAddress' onChange={this.handleChange}/>
                    {errors.email.length > 0 &&  <span style={{color: "red"}}>{errors.email}</span>}
                 </div>
                 <div className='password'>
                    <label htmlFor="password">Password</label>
                    <input type='password' name='password' onChange={this.handleChange}/>
                    {errors.password.length > 0 &&  <span style={{color: "red"}}>{errors.password}</span>}
                 </div>              
                 <div className='submit'>
                    <button>Register</button>
                 </div>
            </form>
        </div>
     </div>
        )
    }
}