/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Formik, Form,
} from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import FormikControl from '../Formik/FormikControl';

function MarcarForm(props) {
  const history = useHistory();

  const initialValues = {
    name: '',
    email: '',
    CPF: '',
    date: null,
  };

  const onSubmit = (values) => {
    console.log('enviado!', values);
    console.log(props);
    history.push('/agenda');
  };

  const validationSchema = yup.object({
    name: yup.string().required('Campo Obrigatório'),
    email: yup.string().required('Campo Obrigatório').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Verifique o email"),
    CPF: yup.string().required('Campo Obrigatório').min(11, "Verifique o CPF").max(11, "Verifique o CPF"),
    date: yup.date().required('Campo Obrigatório').nullable(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {
        (formik) => (
          <Form>
            <FormikControl
              control="input"
              type="text"
              label="Nome"
              name="name"
            />
            <FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
            />
            <FormikControl
              control="input"
              type="text"
              label="CPF"
              name="CPF"
            />
            <FormikControl
              control="date"
              label="Data de Nascimento"
              name="date"
            />
            <button type="submit">Enviar</button>
          </Form>
        )
      }
    </Formik>
  );
}

export default MarcarForm;
