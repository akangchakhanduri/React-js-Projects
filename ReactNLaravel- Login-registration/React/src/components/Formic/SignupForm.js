import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, ErrorMessage, Form, useFormik, useField } from "formik";
import * as Yup from "yup";
import "./SignupForm.css";

// const validate = (values) => {
//   const errors = {};
//   if (!values.fname) {
//     errors.fname = "Required";
//   } else if (values.fname.length > 15) {
//     errors.fname = "Must not exceed 15 characters";
//   }
//   if (!values.lname) {
//     errors.lname = "Required";
//   } else if (values.lname.length > 20) {
//     errors.lname = "Must not exceed 20 characters";
//   }
//   if (!values.email) {
//     errors.email = "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Invalid email address";
//   }
//   return errors;
// };

const SignupForm = () => {
  const formik = useFormik({
    initialValues: { fname: "", lname: "", email: "" },
    // validate,
    validationSchema: Yup.object({
      fname: Yup.string()
        .max(15, "Must not exceed 15 characters")
        .required("Required"),
      lname: Yup.string()
        .max(20, "Must not exceed 20 characters")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      {/* <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">First Nmae</label>
      <input
        id="fname"
        name="fname"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.fname}
      />
      {formik.touched.fname && formik.errors.fname ? <div>{formik.errors.fname}</div> : null}
      <label htmlFor="email">Last Name</label>
      <input
        id="lname"
        type="text"
        {...formik.getFieldProps('lname')}
      />
      {formik.touched.lname && formik.errors.lname ? <div>{formik.errors.lname}</div> : null}
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        type="email"
        {...formik.getFieldProps('email')}
      />
      {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
      <button type="submit">Submit</button>
    </form> */}
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "" }}
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
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" type="text" />
          <ErrorMessage name="firstName" />

          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" type="text" />
          <ErrorMessage name="lastName" />

          <label htmlFor="email">Email Address</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />
          <Field name="firstName" className="form-input" placeholder="Jane" />
          <Field name="message" as="textarea" className="form-textarea" />

          <Field name="colors" as="select" className="my-select">
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </Field>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};
export default SignupForm;
