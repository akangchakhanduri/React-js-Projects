import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errMsg: "",
      resMsg: "",
      redirect: false,
    };
  }

  // onchange input values
  onLogoutHandler = () => {
    localStorage.clear();
    this.setState({ redirect: true });
  };
  // submit data for registration

  render() {
    const details = localStorage.getItem("details");
    return (
      <div className="main_register">
        <h1>Profile Details</h1>
        {details && (
          <>
            <h3>
              {details.fname}
              <span> </span> {details.lname}
            </h3>
            <h3>{details.email}</h3>
            <Button onClick={this.onLogoutHandler()}>Logout</Button>
          </>
        )}
      </div>
    );
  }
}
