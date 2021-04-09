import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/NavBar';

import MarcarVac from './pages/marcarVac';
import Agenda from './pages/agenda';
import Home from './pages/home';

const routes = [
  {
    component: Home,
    name: 'Página Inicial',
    path: '/',
  },
  {
    component: Agenda,
    name: 'Verificar Agendamentos',
    path: '/agenda',
  },
  {
    component: MarcarVac,
    name: 'Marcar Agendamento',
    path: '/marcarVac',
  },
];

function Routes() {
  return (
    <BrowserRouter>
      <Navbar title="Vacina já!" routes={routes} />
      <Switch>
        {routes.map(({ path, component }) => (
          <Route exact key={path} path={path} component={component} />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
