import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from '../src/pages/Profile';
import React from 'react';

// Mocks para simular la respuesta de la API
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});


describe("Profile",()=>{

})
