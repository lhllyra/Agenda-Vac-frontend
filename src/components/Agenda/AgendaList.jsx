/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ModalComponent from '../Modal';
import axios from '../../utils/api';

function agendaList() {
  const [agenda = [], setAgenda] = useState([]);
  const [input, setInput] = useState('');
  const [edit, setEdit] = useState({});
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/appointment');
      setAgenda(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onEdit = async (CPF, report) => {
    try {
      const patient = await axios.get(`/api/user/${CPF}`);
      await axios.put(`/api/user/${CPF}`, { ...patient.data.data, report });
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setShowModal(!showModal);
    setInput('');
  };

  const handleEdit = async (CPF) => {
    try {
      const patient = await axios.get(`/api/user/${CPF}`);
      setEdit(patient.data.data);
      setInput(patient.data.data?.report);
      setShowModal(!showModal);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleChecked = async (event, CPF) => {
    const { checked: isDone } = event.target;

    try {
      const patient = await axios.get(`/api/user/${CPF}`);
      await axios.put(`/api/user/${CPF}`, { ...patient.data.data, isDone });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const calcAge = (value) => Math.floor((Date.now() - value) / 31536000000);

  return (
    <>
      <Table bordered hover className="todos">
        <thead>
          <tr>
            <th>
              CPF do Paciente (Clique para mais opções)
            </th>
            <th>
              Data e Hora do atendimento
            </th>
          </tr>
        </thead>
        <tbody>
          {agenda.map((consultation) => (

            <tr key={consultation._id}>

              <td>
                <button type="button" onClick={() => handleEdit(consultation.CPF[0])}>
                  {consultation.CPF[0]}
                </button>
                <br />
                {' '}
                {consultation.CPF[1] && (
                <button type="button" onClick={() => handleEdit(consultation.CPF[1])}>
                  {consultation.CPF[1]}
                </button>
                )}
              </td>
              <td>
                {consultation.vacTime}
                <br />
                {consultation.vacDate}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalComponent
        onSave={() => onEdit(edit?.CPF, input)}
        show={showModal}
        toggle={() => handleEdit()}
        title="Informações sobre o agendamento"
      >
        <Form>
          <Form.Group>
            <Form.Label>
              Paciente:
              {' '}
              {edit?.name}
              {' , '}
              {calcAge(edit?.birthDate)}
              {' Anos'}
            </Form.Label>
            <br />
            <Form.Label>Status do Atendimento:</Form.Label>
            <br />
            <input
              type="checkbox"
              checked={edit?.isDone}
              onChange={(event) => handleChecked(event, edit?.CPF)}
            />
            <span>{edit?.isDone ? ' realizado' : ' não realizado'}</span>
            <br />
            <Form.Label>Observações sobre o Atendimento:</Form.Label>
            <Form.Control
              value={input}
              rows={3}
              as="textarea"
              onChange={({ target: { value } }) => setInput(value)}
            />
          </Form.Group>
        </Form>
      </ModalComponent>
    </>
  );
}

export default agendaList;
