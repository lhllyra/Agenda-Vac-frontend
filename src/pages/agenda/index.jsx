import React from 'react';
import Page from '../../components/Page';
import AgendaList from '../../components/Agenda/AgendaList';

function Agenda() {
  return (
    <Page title="Agenda de atendimentos:">
      <AgendaList />
    </Page>

  );
}

export default Agenda;
