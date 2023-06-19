import React, { Component, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form, useFormik, useField } from "formik";
import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div className="mb-3">
      <label>
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const Registration = () => {
  const [regData, setRedData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const [resMsg, setResMsg] = useState("");
  const [cpassword, setCpassword] = useState("");

  // onchange input values
  const onChangeHandler = (event) => {
    const { regData } = null;
    // if (event.target.name === "cpassword") {
    //   this.setState({ cpassword: event.target.value });
    // } else {
    //   regData[event.target.name] = event.target.value;
    // }
    // this.setState({ regData });
  };
  // submit data for registration
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("onSubmitHandler", this.state);
    if (this.state.cpassword !== this.state.regData.password) {
      this.setState({ errMsg: "Password must be same" });
    } else {
      axios
        .post(
          "http://127.0.0.1:8000/api/user_registration",
          this.state.regData,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          if (response.data.status === 200) {
            this.setState({
              msg: response.data.message,
              regData: {
                fname: "",
                lname: "",
                email: "",
                password: "",
              },
              cpassword: "",
            });
            setTimeout(() => {
              this.setState({ resMsg: "" });
            }, 2000);
          }
        });
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          acceptedTerms: false, // added for our checkbox
          jobType: "", // added for our select
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
          jobType: Yup.string()
            .oneOf(
              ["designer", "development", "product", "other"],
              "Invalid Job Type"
            )
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="main_register_form">
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Jane"
          />

          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
          />

          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />

          <MySelect label="Job Type" name="jobType">
            <option value="">Select a job type</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </MySelect>

          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </Form>
      </Formik>

      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/repositories">Repositories</Link>
      </div>
      <div>
        <Link to="/posts">Posts</Link>
      </div>
    </>
  );
};
export default Registration;
