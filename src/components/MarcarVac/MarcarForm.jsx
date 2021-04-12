/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Formik, Form,
} from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import FormikControl from '../Formik/FormikControl';
import axios from '../../utils/api';

/* para o controle do numero de pessoas num dado horario:
para o controle do numero de pessoas num dado horario, os appointments terao um
array com dois cpfs no maximo. a partir dai, sera possivel verificar com .length
quantas pessoas já estão naquele horario. A operacao sera uma verificação de
existencia de reserva no horario, se não, será dado um post. se houver 1 cpf
naquele horario, sera feito um post. se houver dois, verificamos quem é o mais jovem
e damos put nas informações
*/

function MarcarForm() {
  const initialValues = {
    name: '',
    CPF: '',
    birthDate: null,
    vacDate: null,
    vacTime: null,
  };

  const makeID = (date, time) => {
    const hour = time._d.getHours();
    const minutes = time._d.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}${month}${year}${hour}${minutes}`;
  };

  const verifyCPF = async (data, CPF) => {
    data.map((regCPF) => {
      if (regCPF !== CPF) {
        return true;
      }
      return false;
    });
  };

  const onSubmit = async (values) => {
    const id = makeID(values.vacDate, values.vacTime);

    try {
      await axios.post('/users', {
        name: values.name,
        CPF: values.CPF,
        birthDate: values.birthDate.toDateString(),
        id: values.CPF,
      });
    } catch (error) {
      // toast.error('Você já está registrado');
    }

    try {
      await axios.post('/appointments', {
        vacDate: values.vacDate.toDateString(),
        vacTime: values.vacTime._d.toLocaleTimeString(),
        CPF: [values.CPF],
        id,
      });
      toast.success('Marcação realizada com sucesso!');
    } catch (error) {
      const appointment = await axios.get(`/appointments/${id}`);
      const CPFArr = appointment.data.CPF;
      if ((CPFArr.length < 2) && (verifyCPF(CPFArr, values.CPF))) {
        await axios.put(`/appointments/${id}`, {
          ...appointment.data,
          CPF: [values.CPF, ...appointment.data.CPF],
        });
        toast.success('Você foi adicionado a marcação');
      } else {
        toast.error('Não foi possível adicionar à marcação');
      }
    }
  };

  const validationSchema = yup.object({
    name: yup.string().required('Campo Obrigatório').matches(/^[A-Za-z]+$/, 'Nome deve conter letras apenas.'),
    CPF: yup.string().required('Campo Obrigatório').min(11, 'Verifique o CPF').max(11, 'Verifique o CPF')
      .matches(/^[0-9]*$/, 'CPF deve conter números apenas.'),
    birthDate: yup.date().required('Campo Obrigatório').nullable(),
    vacDate: yup.date().required('Campo Obrigatório').nullable(),
    vacTime: yup.date().required('Campo Obrigatório').nullable(),
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
            <br />
            <FormikControl
              control="input"
              type="text"
              label="CPF"
              name="CPF"
            />
            <br />
            <FormikControl
              control="date"
              label="Data de Nascimento"
              name="birthDate"
            />
            <br />
            <FormikControl
              control="date"
              label="Data de Vacinação"
              name="vacDate"
              minDate={new Date()}
            />
            <br />
            <FormikControl
              control="time"
              label="Hora da vacinação"
              name="vacTime"
            />
            <br />
            <button type="submit">Enviar</button>
          </Form>
        )
      }
    </Formik>
  );
}

export default MarcarForm;
