/* eslint-disable testing-library/no-unnecessary-act */
import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import mockProducts from '../../mocks/mockProducts';
import Form from './Form';

jest.mock('axios');

describe('Form', () => {
  beforeEach(() => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: [mockProducts[0]] })
    );
  });

  test('Renderiza form', async () => {
    await act(async () => {
      render(<Form setRecommendations={jest.fn()} />);
    });

    expect(screen.getByTestId('preferences')).toBeInTheDocument();
    expect(screen.getByTestId('features')).toBeInTheDocument();
    expect(screen.getByTestId('recommendation')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('Atualiza recomendações baseadas nas preferências escolhidas', async () => {
    const setRecommendations = jest.fn();

    await act(async () => {
      render(<Form setRecommendations={setRecommendations} />);
    });

    await act(async () => {
      fireEvent.click(await screen.findByTestId('preferences-checkbox-0'));
      fireEvent.click(await screen.findByTestId('features-checkbox-0'));
      fireEvent.click(
        await screen.findByTestId('recommendation-multiple-products')
      );
    });

    act(() => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(setRecommendations).toBeCalledWith([
      {
        id: 1,
        name: 'RD Station CRM',
        total: 1,
      },
    ]);
  });
});
