import { render, screen } from '@testing-library/react';
import App from './App';
import * as useProductsHook from './hooks/useProducts';
import mockProducts from './mocks/mockProducts';

describe('App', () => {
  test('Renderiza load', () => {
    jest.spyOn(useProductsHook, 'default').mockReturnValue({
      products: mockProducts,
      features: [mockProducts[0].features],
      preferences: [mockProducts[0].preferences],
      isLoading: true,
    });

    render(<App />);

    const logo = screen.getByRole('img');

    expect(logo).toHaveAttribute(
      'src',
      'https://d3jj9yc7rgpax4.cloudfront.net/brand-system/logos/rdstation-logo-filled-default-horizontal.svg'
    );
  });
});
