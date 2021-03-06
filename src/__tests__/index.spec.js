import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';

import GradientButton from '../';

describe('index', () => {
  it('should not break render', () => {
    const node = document.createElement('div');

    expect(() => {
      render(<GradientButton content="client-rendering" />, node);
    }).not.toThrow();
  });

  it('should not break renderToString', () => {
    global.window = undefined;

    expect(() =>
      renderToString(<GradientButton content="server-rendering" />)
    ).not.toThrow();
  });
});
