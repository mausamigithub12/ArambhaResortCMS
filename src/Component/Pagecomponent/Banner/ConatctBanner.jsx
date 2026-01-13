// import { Formik } from 'formik';
// import React from 'react'

//  const contactSchema = Yup.object({
//       title:Yup.string()
//       .min(5, "Title must be 5 character or more")
//       .max(80, "Title must be 80 characters or less")
//       .required("Title is required"),

//        subtitle: Yup.string()
//        .min(5,"subtitle must be 5 character or more")
//        .max(120,"Subtilte must be 120 characters or less")
//        .required("Subtitle is required"),
//        image:Yup.mixed().required("Image is required")
//  });

// function ConatctBanner() {
//   return (
//     <div>
// <Formik initialValues={{
//     title:"",
//     subtitle:"",
//     image:null
// ,}}
// validationSchema={contactSchema}
// onSubmit={(values,{resetForm,setSubmitting})=>{

// }}

//     </div>
//   )
// }

// export default ConatctBanner