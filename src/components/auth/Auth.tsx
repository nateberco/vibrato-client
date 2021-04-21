import React from "react";
import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./LoginForm";

export interface AuthProps {}
export interface AuthState {
  sessionToken: string;
}
export class Auth extends React.Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);
    this.state = {
      sessionToken: "",
    };
  }
  updateToken = (sessionToken: string) => {
    localStorage.setItem("token", sessionToken);
    this.setState({ sessionToken: sessionToken });
    console.log(sessionToken);
  };
  render() {
    return (
      <div>
        <RegisterForm updateToken={this.updateToken} />
        <LoginForm updateToken={this.updateToken} />
      </div>
    );
  }
}