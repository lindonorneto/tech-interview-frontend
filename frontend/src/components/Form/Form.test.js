/* eslint-disable testing-library/no-unnecessary-act */
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import mockProducts from '../../mocks/mockProducts';
import { REQUIRED_FIELD_ERROR } from '../../shared/constants';
import Form from './Form';
import Recommendation from '../../model/Recommendation';

const setRecommendations = jest.fn();

const renderComponent = async () => {
  await act(async () => {
    render(
      <Form
        setRecommendations={setRecommendations}
        features={mockProducts[0].features}
        preferences={mockProducts[0].preferences}
        products={mockProducts}
        setIsLoading={jest.fn()}
      />
    );
  });
};

const clickPreferences = async () => {
  fireEvent.click(await screen.findByTestId('preferences-checkbox-0'));
};

const clickFeatures = async () => {
  fireEvent.click(await screen.findByTestId('features-checkbox-0'));
};

const clickRecommendationType = async () => {
  fireEvent.click(
    await screen.findByTestId('recommendation-multiple-products')
  );
};

const clickSubmitButton = () => {
  fireEvent.click(screen.getByRole('button'));
};

describe('Form', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Renderiza form', async () => {
    await renderComponent();

    expect(screen.getByTestId('preferences')).toBeInTheDocument();
    expect(screen.getByTestId('features')).toBeInTheDocument();
    expect(screen.getByTestId('recommendation')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('Atualiza recomendações baseadas nas preferências escolhidas', async () => {
    await renderComponent();

    await act(async () => {
      await clickPreferences();
      await clickFeatures();
      await clickRecommendationType();
    });

    act(() => {
      clickSubmitButton();
    });

    expect(setRecommendations).toBeCalledWith([
      new Recommendation({ id: 1, name: 'RD Station CRM' }, 1, 1),
    ]);
  });

  describe('Erros do formulário', () => {
    test('Nenhum campo selecionado', async () => {
      await renderComponent();

      act(() => {
        clickSubmitButton();
      });

      expect(
        screen.getByText(
          new RegExp(REQUIRED_FIELD_ERROR.PREFERENCES_FEATURES, 'i')
        )
      ).toBeInTheDocument();
    });

    test('Apenas o campo preferência selecionado', async () => {
      await renderComponent();

      await act(async () => {
        await clickPreferences();
      });

      act(() => {
        clickSubmitButton();
      });

      expect(
        screen.getByText(
          new RegExp(REQUIRED_FIELD_ERROR.RECOMMENDATION_TYPE, 'i')
        )
      ).toBeInTheDocument();
    });

    test('Apenas o campo funcionalidade selecionado', async () => {
      await renderComponent();

      await act(async () => {
        await clickFeatures();
      });

      act(() => {
        clickSubmitButton();
      });

      expect(
        screen.getByText(
          new RegExp(REQUIRED_FIELD_ERROR.RECOMMENDATION_TYPE, 'i')
        )
      ).toBeInTheDocument();
    });

    test('Apenas o campo tipo de recomendação selecionado', async () => {
      await renderComponent();

      await act(async () => {
        await clickRecommendationType();
      });

      act(() => {
        clickSubmitButton();
      });

      expect(
        screen.getByText(
          new RegExp(REQUIRED_FIELD_ERROR.PREFERENCES_FEATURES, 'i')
        )
      ).toBeInTheDocument();
    });
  });
});
