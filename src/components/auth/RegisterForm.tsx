/* ***************************** LONG VERSION ********************************* */

import React from "react";
import APIURL from '../../helpers/environment';

interface RegisterProps {
  updateToken: Function;
  origin?: string;
  metaToggle?: Function;
}

interface RegisterState {
  username: string;
  password: string;
  errors: {
    password: string;
  };
}
export class RegisterForm extends React.Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {
        password: "",
      },
    };
  }

  handleChange = (e : any) => {
        e.preventDefault();
        const { name, value } = e.target;
        let errors = this.state.errors;
        switch (name) {
      case "password":
        errors.password =
          value.length < 7
            ? "Password must be at least 7 characters long!"
            : "";
        break;
      // default:
      //   break;
    }
    this.setState(Object.assign(this.state, { errors, [name]: value }));
    console.log(this.state.errors);
  };


  handleSubmit = (event: any) => {
    event.preventDefault();
    let validity = true;
    Object.values(this.state.errors).forEach(
      (val) => val.length > 0 && (validity = false)
    );
    if (validity === true) {
      fetch(`${APIURL}/user/register`, {
        method: "POST",
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
        headers: new Headers({
          "content-Type": "application/json",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("userId", data.user.id)
          localStorage.setItem("username", data.user.username)
          this.props.updateToken(data.sessionToken); 
          console.log(data);
          console.log(data.sessionToken);
          if(this.props.origin === "gallery" && this.props.metaToggle !== undefined) {
            this.props.metaToggle()
          }
        });
      console.log("Registration Successful!");
    } else {
      console.log("Unable to Register - Please Try Again!"); //show error later
    }
  };

  
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div>
          <h2 className="header">Sign Up</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="username">
              <label htmlFor="username">username</label>
              <input
                type="text"
                name="username"
                onChange={this.handleChange}
              />
            </div>
            <div className="password">
              <label htmlFor="password">password</label>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
              />
              {errors.password.length > 0 && (
                <span style={{ color: "red" }}>{errors.password}</span>
              )}
            </div>
            <div className="submit">
              <button className="buttonForm">Register Now!</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


/* **************************** SHORT VERSION **************************** */


// import React from "react";

// //Regex Expression - used to validate email as a real email
// // const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

// // INTERFACES
// interface SignUpProps {
//     updateToken: Function;
//  };

// interface SignUpState {
//     username : string,
//     password : string,
//     errors : {
//        username : string,
//        password : string
//     };
//  }

// export class RegisterForm extends React.Component<SignUpProps, SignUpState>{
//        //Constructor
//        constructor(props: SignUpProps) {
//          super(props);
//          this.state = {
//             username : '',
//             password : '',
//             errors : {
//               username : '',
//               password : ''
//             }, 
//           };
//       }

//    /* ****** HANDLE CHANGE (simple) ****** */
//       handleChange = (e: any) => {
//          this.setState(e.target.value)   
//          }
      
//     //handleSubmit Function
//     handleSubmit = (event : any) => {
//         event.preventDefault();

//         let validity = true;
//         Object.values(this.state.errors).forEach(
//             (val) => val.length > 0 && (validity = false)
//         );
//         if (validity === true) {
//             fetch("http://localhost:3000/user/register", {
//             method: "POST",
//             body: JSON.stringify({
//             username: this.state.username, 
//             password: this.state.password,
//             }),
//             headers: new Headers({
//               "Content-Type": "application/json",
//             }),
//           })
//             .then((response) => response.json())
//             .then((data) => {
//                this.props.updateToken(data.sessionToken); 
//                // update username too??
//                console.log(data);
//             //   history.push('/where you want it to stay ?');
//             // console.log("User Successfully Registered!")
//             })
//             .catch(err=> console.log(err))
//         } else {
//             console.log("Unable to Register User - Please Try Again!") //DISPLAY THIS !
//         }
//     };


//     render() {
//       //   const {errors} = this.state    
//         return (
//          <div className='wrapper'>
//            <div className='form-wrapper'>
//               <h2>Register</h2>
//               <form onSubmit={this.handleSubmit} noValidate >
//                  <div className='username'>
//                     <label htmlFor="username">username</label>
//                     <input 
//                         type='text' 
//                         name='username' 
//                         value= {this.state.username}
//                         onChange={(e: React.FormEvent<HTMLInputElement>) => 
//                         this.setState({ username: e.currentTarget.value })} placeholder="username" 
//                         />
//                     {/* {errors.username.length > 0 && 
//                     <span style={{color: "red"}}>{errors.username}</span>
//                     } */}
//                  </div>
//                  <div className='password'>
//                     <label htmlFor="password">Password</label>
//                     <input 
//                         type='password' 
//                         name='password' 
//                         value= {this.state.password}
//                         onChange={(e: React.FormEvent<HTMLInputElement>) => 
//                            this.setState({ password: e.currentTarget.value })} placeholder="password" 
//                         />
//                     {/* {errors.password.length > 0 &&  
//                     <span style={{color: "red"}}>{errors.password}</span>
//                     } */}
//                  </div>              
//                  <div className='submit'>
//                     <button>Sign Me Up!</button>
//                  </div>
//             </form>
//         </div>
//      </div>
//         );
//     }
// }



