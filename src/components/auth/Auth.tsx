/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./LoginForm";
import {Container, Row, Col} from 'reactstrap';
import "./Auth.css";


export interface AuthProps {
  updateToken: Function;
  updateUsername: Function;
  origin?: string;
  metaToggle?: Function; 
}

export interface AuthState {
  sessionToken: string;
  displayLogin: boolean;
  username: string;
}

export class Auth extends React.Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);
    this.state = {
      sessionToken: "",
      username: "",
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
  };

  render() { 
    return ( 
        <div className="authWrapper">
        <Container className="authForm-wrapper">
            <div>
            <Row >
                {this.state.displayLogin ? <LoginForm origin={this.props.origin} metaToggle={this.props.metaToggle} updateToken = {this.props.updateToken}/> : 
                        <RegisterForm origin={this.props.origin} metaToggle={this.props.metaToggle} updateToken = {this.props.updateToken}/> }
            </Row>
            <Row   >
                <Col className="authForm-toggler">
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