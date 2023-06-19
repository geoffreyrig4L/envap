import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignIn = () => {
  return (
    <div>
      <Formik
        validationSchema={Yup.object({
          email: Yup.string().email("Email invalide").required("Required"),
          password: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
      >
        <Form>
          <Field type="input" placeholder="Entrer votre adresse mail"></Field>
          <Field
            type="password"
            placeholder="Entrer votre mot de passe"
          ></Field>
        </Form>
      </Formik>
    </div>
  );
};

export default SignIn;
