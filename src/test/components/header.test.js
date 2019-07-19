import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../components/header';
import { render, fireEvent } from '@testing-library/react';


it('header element test', () => {
    const { getByText, getByPlaceholderText } = render(<Header />);
    getByText('풀꽃길'); // button이 있는지 확인
    getByText('꽃 도감'); // button이 있는지 확인
    getByText('풀꽃집'); // button이 있는지 확인
    getByText('꽃과의 만남'); // button이 있는지 확인
});

