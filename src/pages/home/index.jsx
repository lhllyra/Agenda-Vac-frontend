import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Page from '../../components/Page';

function index() {
  return (
    <Page title="Bem vindo ao agendamento de vacinação da cidade do Recife">
      Selecione o serviço desejado:
      <br />
      <br />
      <Link to="/marcarVac" className="mr-4">
        <Button>Agendar Vacinação</Button>
      </Link>
      <Link to="/agenda" className="mr-4">
        <Button>Verificar Agendamentos</Button>
      </Link>
    </Page>
  );
}

export default index;
