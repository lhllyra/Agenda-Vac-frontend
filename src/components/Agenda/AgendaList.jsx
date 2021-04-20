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
  const [check, setCheck] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const calcAge = (value) => Math.floor((Date.now() - value) / 31536000000);

  const fetchAgenda = async () => {
    try {
      const response = await axios.get('/api/appointment');
      setAgenda(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchUser = async (CPF) => {
    try {
      const patient = await axios.get(`/api/user/${CPF}`);
      setEdit(patient.data.data);
      setInput(patient.data.data?.report);
      setCheck(patient.data.data?.isDone);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect((CPF) => {
    fetchAgenda();
    fetchUser(CPF);
  }, []);

  const onEdit = async (CPF, report) => {
    try {
      await axios.put(`/api/user/${CPF}`, { ...edit, report });
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setShowModal(!showModal);
    setInput('');
  };

  const handleChecked = async (event, CPF) => {
    const { checked: isDone } = event.target;
    setCheck(!check);
    try {
      await axios.put(`/api/user/${CPF}`, { ...edit, isDone });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleEdit = async (CPF) => {
    fetchUser(CPF);
    setShowModal(!showModal);
  };

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
              checked={check}
              onChange={(event) => handleChecked(event, edit?.CPF)}
              type="checkbox"
            />
            <span>{check ? ' realizado' : ' não realizado'}</span>
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
