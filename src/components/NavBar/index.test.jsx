/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import Header from './index';

describe('NavBar Component', () => {
  it('renders', () => {
    render(
      <Header>
        olá
      </Header>,
    );
  });
});
