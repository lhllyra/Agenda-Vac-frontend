import React from 'react';
import Page from '../../components/Page';
import AgendaList from '../../components/Agenda/AgendaList';
import AgendaContextProvider from './AgendaContextProvider';

function Agenda() {
  return (
    <Page title="Agenda de atendimentos:">
      <AgendaList />
    </Page>

  );
}

export default () => (
  <AgendaContextProvider>
    <Agenda />
  </AgendaContextProvider>
);
