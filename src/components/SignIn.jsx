import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignIn = () => {
  // Définition du schéma de validation avec Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Le nom d'utilisateur est requis"),
    password: Yup.string().required("Le mot de passe est requis"),
  });

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = (values, { setSubmitting }) => {
    // Effectuer des actions de connexion ici, par exemple une requête HTTP

    // Réinitialiser le formulaire après la soumission
    setSubmitting(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-[60px]">Connexion</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-[40%] ml-[60px]">
          <div className="field">
            <label htmlFor="username">Nom d&apos;utilisateur</label>
            <Field
              className="inputFormik"
              type="text"
              id="username"
              name="username"
              autoComplete="off"
            />
            <ErrorMessage
              className="errorMessage"
              name="username"
              component="div"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Mot de passe</label>
            <Field
              className="inputFormik"
              type="password"
              id="password"
              name="password"
              autoComplete="off"
            />
            <ErrorMessage
              className="errorMessage"
              name="password"
              component="div"
            />
          </div>

          <button className="button submit shadow" type="submit">
            Se connecter
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignIn;
