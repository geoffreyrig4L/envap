"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import users from "@/resources/users";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import SessionContext from "@/app/context/session";

const SignIn = () => {
  const { setUser } = useContext(SessionContext);

  const router = useRouter();

  // Définition du schéma de validation avec Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Le nom d'utilisateur est requis"),
    password: Yup.string().required("Le mot de passe est requis"),
  });

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = (values, { setSubmitting }) => {
    users.forEach((user) => {
      if (
        values.username === user.username &&
        values.password === user.password
      ) {
        setUser(user);
        router.push("/");
      } else {
        document.getElementById("errorSignIn").textContent =
          "Nom d'utilisateur et / ou mot de passe incorrect";
      }
    });
    setSubmitting(false);
  };

  return (
    <div>
      <h1 className="title mb-[4vh]">Connexion</h1>
      <Formik
        initialValues={{ username: "gamma", password: "gamma1" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-full ml-[60px]">
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
              className="errorMessage bottom-[calc(-15px-1vh)]"
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
              className="errorMessage bottom-[calc(-15px-1vh)]"
              name="password"
              component="div"
            />
          </div>

          <div className="flex flex-row justify-start items-center">
            <button
              className="button enabled m-[1.2em] py-[2vh] px-[2vw] shadow"
              type="submit"
            >
              Se connecter
            </button>
            <p id="errorSignIn" className="opacity-[0.6]"></p>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignIn;
