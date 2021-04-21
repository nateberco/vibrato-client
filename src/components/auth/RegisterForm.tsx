import React from "react";

//Regex Expression - used to validate email as a real email
// const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

// INTERFACES
interface SignUpProps {
    updateToken: Function;
 };

interface SignUpState {
    email : string,
    password : string,
    errors : {
       email : string,
       password : string
    };
 }

export class RegisterForm extends React.Component<SignUpProps, SignUpState>{
       //Constructor
       constructor(props: SignUpProps) {
         super(props);
         this.state = {
            email : '',
            password : '',
            errors : {
              email : '',
              password : ''
            }, 
          };
      }

   /* ****** HANDLE CHANGE (simple) ****** */
      handleChange = (e: any) => {
         this.setState(e.target.value)   
         }
      
    //handleSubmit Function
    handleSubmit = (event : any) => {
        event.preventDefault();

        let validity = true;
        Object.values(this.state.errors).forEach(
            (val) => val.length > 0 && (validity = false)
        );
        if (validity === true) {
            fetch("http://localhost:3000/user/register", {
            method: "POST",
            body: JSON.stringify({
            email: this.state.email, 
            password: this.state.password,
            }),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          })
            .then((response) => response.json())
            .then((data) => {
               this.props.updateToken(data.sessionToken); 
               // update email too??
               console.log(data);
            //   history.push('/where you want it to stay ?');
            // console.log("User Successfully Registered!")
            })
            .catch(err=> console.log(err))
        } else {
            console.log("Unable to Register User - Please Try Again!") //DISPLAY THIS !
        }
    };


    render() {
      //   const {errors} = this.state    
        return (
         <div className='wrapper'>
           <div className='form-wrapper'>
              <h2>Register</h2>
              <form onSubmit={this.handleSubmit} noValidate >
                 <div className='emailAddress'>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input 
                        type='text' 
                        name='emailAddress' 
                        value= {this.state.email}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => 
                        this.setState({ email: e.currentTarget.value })} placeholder="email" 
                        />
                    {/* {errors.email.length > 0 && 
                    <span style={{color: "red"}}>{errors.email}</span>
                    } */}
                 </div>
                 <div className='password'>
                    <label htmlFor="password">Password</label>
                    <input 
                        type='password' 
                        name='password' 
                        value= {this.state.password}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => 
                           this.setState({ password: e.currentTarget.value })} placeholder="password" 
                        />
                    {/* {errors.password.length > 0 &&  
                    <span style={{color: "red"}}>{errors.password}</span>
                    } */}
                 </div>              
                 <div className='submit'>
                    <button>Sign Me Up!</button>
                 </div>
            </form>
        </div>
     </div>
        );
    }
}



                  // HANDLE CHANGE FUNCTION (w/ errors)
   //  onChange = (e : any) => {
   //      e.preventDefault();
   //      const { name, value } = e.target;
   //      let errors = this.state.errors;
   //      switch (name) {
   //        case 'email':
   //           errors.email = 
   //             Regex.test(value)
   //             ? '': 'Email is not valid!';
   //             break;
   //        case 'password':
   //           errors.password = 
   //             value.length < 7 
   //             ? 'Password must be at least 7 characters long!'
   //             : '';
   //             break;
   //             default:
   //             break;
   //      }
   //    this.setState(Object.assign(this.state, { errors,[name]: value }));
   //    console.log(this.state.errors);
   //    };