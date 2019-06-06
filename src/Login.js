import React, { Component } from "react";
import { login } from "./api";
import "./Login.css";
import { SSL_OP_SINGLE_DH_USE } from "constants";
/*
// Uncontrolled Component (Input decides by itself!):

class Login extends Component {
  usernameInput = null;
  passwordInput = null;

  handleSubmit = event => {
    event.preventDefault();
    login(this.usernameInput.value, this.passwordInput.value)
      .then(res => {
        alert(res.message);
      })
      .catch(err => {
        alert(err.message);
      });
  };
  render() {
    return (
      <div style={{ width: "400px", margin: "10px auto" }}>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <lable>Username : </lable>
          <input
            ref={input => {
              this.usernameInput = input;
            }}
            type="text"
          />
          <br />
          <lable>Password : </lable>
          <input
            ref={input => {
              this.passwordInput = input;
            }}
            type="password"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
*/

//Controlled Component (I decide for input what to do!)
//For this matter we have to give to the "input" two things:
//1- A "value"  2-onChange
var strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
/*
    ^	The password string will start this way
(?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
(?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
(?=.*[0-9])	The string must contain at least 1 numeric character
(?=.[!@#\$%\^&])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
(?=.{8,})	The string must be eight characters or longer
https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
*/

//Instead of having several "p" we make a component with (props):
function FormMessage(props) {
  return props.children ? (
    <p
      style={{
        backgroundColor: props.success
          ? "green"
          : props.error
          ? "red"
          : undefined,
        display: "block",
        color: "white",
        borderRadius: "50%",
        fontFamily: "algerian",
        fontSize: "18px",
        margin: "10px auto"
      }}
    >
      {props.children}
    </p>
  ) : null;
}

class Login extends Component {
  state = {
    username: "",
    password: "",
    submiting: false,
    error: "",
    message: "",
    pristine: true
  };
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      submiting: true,
      error: "",
      message: ""
    });
    login(this.state.username, this.state.password)
      .then(res => {
        this.setState({
          message: res.message
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      })
      .finally(() => {
        this.setState({
          submiting: false
        });
      });
  };
  handleReset = () => {
    this.setState({
      username: "",
      password: "",
      pristine: true,
      error: "",
      message: ""
    });
  };
  handleUsernameChange = event => {
    this.setState({
      username: event.target.value.slice(0, 10),
      pristine: false
    });
  };
  handlePasswordChange = event => {
    let password = event.target.value;
    this.setState({
      password: event.target.value,
      passwordError: !password.match(strongRegex)
        ? "Password should be strong!"
        : null,
      pristine: false
    });
  };
  render() {
    return (
      <div style={{ width: "400px", margin: "10px auto" }}>
        <h1 className="Login">Login form</h1>
        <h3>
          This form consists of many different tools such as Submit/Reset
          buttons, and used StrongRegex for password. Using "Promise" callBack
          and "Props children for having cleaner components"!
        </h3>
        <form onSubmit={this.handleSubmit}>
          <lable style={{ fontSize: "35px" }}>Username : </lable>
          <input
            placeholder="Username..."
            className="username"
            value={this.state.username}
            onChange={this.handleUsernameChange}
            type="text"
          />
          <br />
          <lable style={{ fontSize: "35px" }}>Password : </lable>
          <input
            placeholder="Password..."
            value={this.state.password}
            onChange={this.handlePasswordChange}
            className="password"
            style={{
              borderColor: this.state.passwordError ? "red" : undefined
            }}
            type="password"
          />
          <FormMessage error={true}>{this.state.passwordError}</FormMessage>
          <input
            disabled={this.state.submiting}
            type="submit"
            style={{ margin: "10px" }}
            value="Submit"
            className="Submit"
          />
          <input
            onClick={this.handleReset}
            type="reset"
            disabled={this.state.pristine}
            value="Reset"
            className="Dokme"
          />

          <FormMessage error={true}>{this.state.error}</FormMessage>
          <FormMessage success={true}>{this.state.message}</FormMessage>
        </form>
      </div>
    );
  }
}
export default Login;
