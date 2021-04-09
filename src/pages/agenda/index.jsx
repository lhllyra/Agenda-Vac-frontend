import React from 'react';
import Page from '../../components/Page';
import AgendaForm from '../../components/Agenda/AgendaForm';

function Agenda() {
  return (
    <Page title="Agenda de atendimentos:">
      <AgendaForm />
    </Page>

  );
}

export default Agenda;
