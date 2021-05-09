/* **************** LONG VERSION *************** */

import React from "react";
import "../../App.css";
import APIURL from '../../helpers/environment';

interface LoginProps {
  updateToken: Function;
  origin?: string;
  metaToggle?: Function;
}

interface LoginState {
  username: string;
  password: string;
  errors: {
    password: string;
  };
}
export class LoginForm extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
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
      default:
        break;
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
      fetch(`${APIURL}/user/login`, {
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
          localStorage.setItem("role", data.user.role)
          this.props.updateToken(data.sessionToken); 
          console.log(data);
          if(this.props.origin === "gallery" && this.props.metaToggle !== undefined) {
            this.props.metaToggle()
          }
        });
      console.log("Login Successful!");
    } else {
      console.log("Unable to Login - Please Try Again!"); //show error later
    }
  };
  render() {
    // const { errors } = this.state; // taking errors out on Login Form since we don't need password validation
    return (
      <div>
        <div>
          <h2 className="header">Login</h2>
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
              {/* {errors.password.length > 0 && (
                <span style={{ color: "red" }}>{errors.password}</span>
              )} */}
            </div>
            <div className="submit">
              <button className="buttonForm">Log In!</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


/* ************************** SHORT VERSION ************************ */


// import React from "react";


// //Regex Expression - used to validate username as a real username
// // const Regex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);


// // INTERFACES
// interface LoginProps {
//     updateToken: Function;
//  };

// interface LoginState {
//     username : string,
//     password : string,
//     errors : {
//        username : string,
//        password : string
//     };
//  }

// export class LoginForm extends React.Component<LoginProps, LoginState>{
//        //Constructor
//        constructor(props: LoginProps) {
//          super(props);
//          this.state = {
//             username : '',
//             password : '',
//             errors : {
//               username : '',
//               password : ''
//             } 
//           }
//       }

//    /* ****** HANDLE CHANGE (simple) ****** */
//    handleChange = (e: any) => {
//       this.setState(e.target.value)   
//       }


//     //handleSubmit Function
//     handleSubmit = (event : any) => {
//         event.preventDefault();
//         let validity = true;
//         Object.values(this.state.errors).forEach(
//             (val) => val.length > 0 && (validity = false)
//         );
//         if(validity === true){
//             fetch("http://localhost:3000/user/login/", {
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
//                this.props.updateToken(data.sessionToken); //may be token
//                // update username?? 
//                console.log(data);
//             //   history.push('/where you want it to stay ?');
//             // console.log("Login Successful!")
//             })
//             .catch(err=> console.log(err))
//         } else {
//             console.log("Unable to Login - Please Try Again!") //DISPLAY THIS !
//         };
//     }



//     render() {
//       //   const {errors} = this.state    
//         return (
//          <div className='wrapper'>
//            <div className='form-wrapper'>
//               <h2>Login</h2>
//               <form onSubmit={this.handleSubmit} noValidate >
//                  <div className='username'>
//                     <label htmlFor="username">username</label>
//                     <input 
//                         type='text' 
//                         name='username' 
//                         onChange={(e: React.FormEvent<HTMLInputElement>) => 
//                            this.setState({ username: e.currentTarget.value })} placeholder="username" 
//                            />
//                     {/* {errors.username.length > 0 &&  <span style={{color: "red"}}>{errors.username}</span>} */}
//                  </div>
//                  <div className='password'>
//                     <label htmlFor="password">Password</label>
//                     <input 
//                         type='password' 
//                         name='password' 
//                         onChange={(e: React.FormEvent<HTMLInputElement>) => 
//                            this.setState({ password: e.currentTarget.value })} placeholder="password" 
//                      />
                     
//                     {/* {errors.password.length > 0 &&  
//                     <span style={{color: "red"}}>{errors.password}</span>
//                     } */}
//                  </div>              
//                  <div className='submit'>
//                     <button>Login!</button>
//                  </div>
//             </form>
//         </div>
//      </div>
//         );
//     }
// }




