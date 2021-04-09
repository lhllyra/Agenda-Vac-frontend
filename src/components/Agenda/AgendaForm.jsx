/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Formik, Form,
} from 'formik';
import * as yup from 'yup';
import FormikControl from '../Formik/FormikControl';

function AgendaForm() {
  const initialValues = {
    date: null,
    time: null,
  };

  const onSubmit = (values) => {
    console.log('enviado!', values);
  };

  const validationSchema = yup.object({
    date: yup.date().required('Campo Obrigatório').nullable(),
    time: yup.date().required('Campo Obrigatório').nullable(),
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
              control="date"
              label="Data de atendimento"
              name="date"
              minDate={new Date()}
            />
            <FormikControl
              control="time"
              label="Hora do atendimento"
              name="time"
            />
            <button type="submit">Enviar</button>
          </Form>
        )
      }
    </Formik>
  );
}

export default AgendaForm;
