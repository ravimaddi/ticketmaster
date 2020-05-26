import React from 'react'

import './customerForm.css'
class CustomerForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.customer ? this.props.customer.name : '',
      mobile: this.props.customer ? this.props.customer.mobile : '',
      email: this.props.customer ? this.props.customer.email : ''
    }

  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.handleSubmit(this.state)
  }
  // handleFormSubmit=(e)=>{
  //     e.preventDefault()
  //     this.props.handleFormSubmit(this.state)
  // }

  render() {

    return (

      <div className="customerform">
        <form onSubmit={this.handleSubmit}>
          <label> Name:
                        <input className="input" type="text" value={this.state.name} onChange={this.handleChange} name="name" />
          </label><br />
          <label> Email:
                        <input className="input" type="email" value={this.state.email} onChange={this.handleChange} name="email" />
          </label><br />
          <label> Mobile:
                        <input className="input" type="text" value={this.state.mobile} onChange={this.handleChange} name="mobile" />
          </label><br />
          <input className="submit" type="submit" />
        </form>

      </div>

    )
  }
}
export default CustomerForm


// import React from 'react';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';

// const SignupSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
//   mobile: Yup.string()
//     .max(10, 'Mobile  number  must be 10 digits only!')
//     .required('Required'),
//   email: Yup.string()
//     .email('Invalid email')
//     .required('Required'),
// });
//     const style={
//         color:'red'
//     }
//  const CustomerForm= () => (

//   <div>

//     <Formik
//       initialValues={{
//         name: '',
//         mobile: '',
//         email: '',
//       }}
//       validationSchema={SignupSchema}
//       onSubmit={values => {

//         console.log(values);
//       }}
//     >
//       {({ errors, touched }) => (
//         <Form>
//             <label>Name:-
//           <Field name="name" />
//           {errors.name && touched.name ? (
//             <div style={style}>{errors.name}</div>
//           ) : null}
//           </label><br/>
//           <label>Mobile:-
//           <Field name="mobile" />
//           {errors.mobile && touched.mobile ? (
//             <div style={style}>{errors.mobile}</div>
//           ) : null}
//           </label><br/>
//           <label>Email:-
//           <Field name="email" type="email" />
//           {errors.email && touched.email ? <div style={style}>{errors.email}</div> : null}
//           </label><br/>
//           <button type="submit">Submit</button>
//         </Form>
//       )}
//     </Formik>
//   </div>
// );
// export default CustomerForm

