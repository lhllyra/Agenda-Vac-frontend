/* eslint-disable no-undef */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MarcarForm from './MarcarForm';

test('rendering and submitting the vaccination form', async () => {
  const handleSubmit = jest.fn();
  render(<MarcarForm onSubmit={handleSubmit} />);

  userEvent.type(screen.getByLabelText(/Nome/i), 'Luis');
  userEvent.type(screen.getByLabelText(/CPF/i), '12345678910');
  userEvent.type(screen.getByLabelText(/Data de Nascimento/i), '07/04/2021');
  userEvent.type(screen.getByLabelText(/Data de Vacinação/i), '17/08/2021');
  userEvent.type(screen.getByLabelText(/Hora da Vacinação/i), '14:30');

  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({
    Nome: 'Luis',
    CPF: '12345678910',
    birthDate: '1617764400000',
    vacDate: 'Tue Aug 17 2021',
    vacTime: '2:30:33 PM',
  }, expect.anything()));
});
