/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Formik, Form,
} from 'formik';
import * as yup from 'yup';
import FormikControl from '../Formik/FormikControl';
import ListView from '../ListView';
import axios from '../../utils/api';

function AgendaForm() {
  const initialValues = {
    date: null,
    time: null,
  };

  const onSubmit = async (values) => {
    console.log('enviado!', values.date);
    try {
      await axios.post('/appointments', { date: values.date, time: values.time });
    } catch (error) {
      console.log(error.message);
    }
  };

  const validationSchema = yup.object({
    date: yup.date().required('Campo Obrigatório').nullable(),
    time: yup.date().required('Campo Obrigatório').nullable(),
  });

  const columns = [
    {
      name: 'isDone',
      value: 'Concluido',
    },
    {
      name: 'date',
      value: 'Data',
    },
    {
      name: 'time',
      value: 'Hora',
    },
    {
      name: 'textArea',
      value: 'Notas de atendimento',
    },
  ];

  return (
    <>
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
      <ListView
        columns={columns}
        endpoint="/appointments"
      />
    </>
  );
}

export default AgendaForm;
