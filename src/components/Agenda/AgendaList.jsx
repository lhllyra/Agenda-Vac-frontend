/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { AgendaContext } from '../../pages/agenda/AgendaContextProvider';

function agendaList() {
  const [agenda, setAgenda] = useContext(AgendaContext);

  return (
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
              <a href="/marcarVac">
                {consultation.CPF[0]}
              </a>
              <br />
              <a href="/marcarVac">
                {consultation.CPF[1]}
              </a>
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
  );
}

export default agendaList;
