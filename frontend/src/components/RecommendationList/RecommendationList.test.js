import { render, screen } from '@testing-library/react';
import RecommendationList from './RecommendationList';
import mockProducts from '../../mocks/mockProducts';

describe('RecommendationList', () => {
  test('Renderiza lista de recomendações', () => {
    render(<RecommendationList recommendations={[mockProducts[0]]} />);

    expect(screen.getByText(/RD Station CRM/i)).toBeInTheDocument();
  });

  test('Renderiza estado vazio', () => {
    render(<RecommendationList recommendations={[]} />);

    expect(
      screen.getByText(/Nenhuma recomendação encontrada./i)
    ).toBeInTheDocument();
  });
});
