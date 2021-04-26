import React from "react";
import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./LoginForm";
import {Container, Row, Col} from 'reactstrap';
import "./Auth.css";

export interface AuthProps {
  updateToken: Function;
}

export interface AuthState {
  sessionToken: string;
  displayLogin: boolean;
}

export class Auth extends React.Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);
    this.state = {
      sessionToken: "",
      displayLogin: true
    };
  }

  updateToken = (sessionToken: string) => {
    localStorage.setItem("token", sessionToken);
    this.setState({ sessionToken: sessionToken });
    console.log(sessionToken);
  };

  toggle = () => {
    this.setState({
      displayLogin: !(this.state.displayLogin)
    });
  }


  render() { 
    return ( 
        <div className="wrapper">
        <Container className="form-wrapper">
            <div>
            <Row >
                {this.state.displayLogin ? <LoginForm updateToken = {this.updateToken}/> : 
                        <RegisterForm updateToken = {this.updateToken}/> }
            </Row>
            <Row   >
                <Col className="form-toggler">
                {this.state.displayLogin ? <a id="switch-form" onClick={this.toggle} >New to Vibrato? Register Now!</a> : 
                <a id="switch-form" onClick={this.toggle}>Already have an account? Log in here.</a>}
                </Col>
            </Row>
            </div>
        </Container>
            </div>
        
    )};
}

export default Auth;