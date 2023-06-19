import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regData: {
        email: "",
        password: "",
      },
      errMsg: "",
      resMsg: "",
      redirect: false,
    };
  }

  // onchange input values
  onChangeHandler = (event) => {
    const { regData } = this.state;

    regData[event.target.name] = event.target.value;

    this.setState({ regData });
  };
  // submit data for registration
  onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("onSubmitHandler", this.state);

    axios
      .post("http://127.0.0.1:8000/api/user_login", this.state.regData, {headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }})
      .then((response) => {
        if (response.data.status === 200) {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("details", JSON.stringify(response.data.data));
          this.setState({
            msg: response.data.message,
            regData: {
              email: "",
              password: "",
              redirect: true,
            },
          });
          setTimeout(() => {
            this.setState({ resMsg: "" });
          }, 2000);
        }
      });
  };
  render() {
    return (
      <div className="main_register">
        <Form onSubmit={this.onSubmitHandler} className="main_register_form">
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={this.onChangeHandler}
              name="email"
              type="email"
              placeholder="Enter your email id"
              value={this.state.regData.email}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={this.onChangeHandler}
              name="password"
              type="password"
              placeholder="Enter your password"
              value={this.state.regData.password}
            />
          </Form.Group>

          {this.state.resMsg && <span>{this.state.resMsg}</span>}

          <Button type="submit">Login</Button>
        </Form>
        <Link to="/">Register</Link>
      </div>
    );
  }
}
