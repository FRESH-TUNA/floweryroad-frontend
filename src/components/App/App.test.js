import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render, fireEvent } from '@testing-library/react';


it('app home connect test', () => {
  const { getByPlaceholderText } = render(<App/>);
  const inputA = getByPlaceholderText('a');
  const inputB = getByPlaceholderText('b');
  const inputC = getByPlaceholderText('c');
  const inputD = getByPlaceholderText('d');

  fireEvent.change(inputA, {
    target: {
      value: 'A'
    }
  });
  fireEvent.change(inputB, {
    target: {
      value: 'B'
    }
  });
  fireEvent.change(inputC, {
    target: {
      value: 'C'
    }
  });
  fireEvent.change(inputD, {
    target: {
      value: 'D'
    }
  });

  expect(inputA).toHaveAttribute('value', 'A');
  expect(inputB).toHaveAttribute('value', 'B');
  expect(inputC).toHaveAttribute('value', 'C');
  expect(inputD).toHaveAttribute('value', 'D');
});