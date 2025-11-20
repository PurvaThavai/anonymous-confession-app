import * as Yup from "yup";

// Yup is a JavaScript validation library that defines rules and constraints for your form fields.
// It works beautifully with Formik to validate input data.
export const signUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required").matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Password have minimum 8 characters, atleast one upper case, one lower case, one numeric, and at least one  symbol allowed"), 
    // regex expression gheun validate karat ahot
    phone: Yup.string().required("Phone is required")
});
