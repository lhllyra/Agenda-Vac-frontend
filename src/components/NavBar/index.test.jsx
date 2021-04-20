/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Header from './index';

const testRoutes = [
  {
    name: 'Página Inicial',
    path: '/',
  },
  {
    name: 'Verificar Agendamentos',
    path: '/agenda',
  },
  {
    name: 'Marcar Agendamento',
    path: '/marcarVac',
  },
];

describe('NavBar Component', () => {
  it('renders', () => {
    const { debug } = render(
      <BrowserRouter>
        <Header routes={testRoutes} />
      </BrowserRouter>,
    );

    debug();
  });
});
