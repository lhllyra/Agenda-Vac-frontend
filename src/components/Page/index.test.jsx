/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import Page from './index';

describe('Page Component test', () => {
  it('Renders Page Component', () => {
    const { asFragment } = render(
      <Page />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('pushing props', () => {
    const { queryByText } = render(
      <Page title="Bem vindo ao sistema">
        <div className="className">
          <span>Olá!</span>
        </div>
      </Page>,
    );

    expect(
      queryByText('Bem vindo ao sistema'),
    ).toBeTruthy();
    expect(
      queryByText('Olá!'),
    ).toBeTruthy();
  });
});
