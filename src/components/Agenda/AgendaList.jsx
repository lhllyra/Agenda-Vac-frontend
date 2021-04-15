/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { AgendaContext } from '../../pages/agenda/AgendaContextProvider';

function agendaList() {
  const [agenda, setAgenda] = useContext(AgendaContext);

  // version one, CPF's grouped by date and time

  return (
    <Table bordered hover className="todos">
      <thead>
        <tr>
          <th>CPF do Paciente (Clique para mais opções)</th>
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

  // version 2: separated CPFs with date and time indications

  // return (
  //   <Table bordered hover className="todos">
  //     <thead>
  //       <tr>
  //         <th>Status</th>
  //         <th>Dados do Paciente</th>
  //         <th>
  //           Data e Hora do atendimento
  //         </th>
  //         <th>Relatório de Atendimento</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {agenda.map((consultation) => consultation.CPF.map((patient) => (

  //         <tr key={patient}>
  //           <td>
  //             <input type="checkbox" />
  //           </td>
  //           <td>
  //             {patient}
  //           </td>
  //           <td>
  //             {consultation.vacTime}
  //             <br />
  //             {consultation.vacDate}
  //           </td>
  //           <td>
  //             <textarea />
  //           </td>
  //         </tr>
  //       )))}
  //     </tbody>
  //   </Table>
  // );

  // attempted filtering based on agendaForm

  // return (
  //   <Table bordered hover className="todos">
  //     <thead>
  //       <tr>
  //         <th>Status</th>
  //         <th>Dados do Paciente</th>
  //         <th>
  //           Data e Hora do atendimento
  //         </th>
  //         <th>Relatório de Atendimento</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {agenda.map((consultation) => consultation.CPF.map((patient) => (

  //         <tr key={patient}>
  //           <td>
  //             <input type="checkbox" />
  //           </td>
  //           <td>
  //             {patient}
  //           </td>
  //           <td>
  //             {consultation.vacTime}
  //             <br />
  //             {consultation.vacDate}
  //           </td>
  //           <td>
  //             <textarea />
  //           </td>
  //         </tr>
  //       )))}
  //     </tbody>
  //   </Table>
  // );
}

export default agendaList;
