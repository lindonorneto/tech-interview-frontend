import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';
import { MULTIPLE_PRODUCTS, SINGLE_PRODUCT } from '../shared/constants';

describe('recommendationService', () => {
  describe('SingleProduct', () => {
    test('Retorna recomendação correta com base nas preferências selecionadas', () => {
      const formData = {
        selectedPreferences: ['Integração com chatbots'],
        selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
        selectedRecommendationType: SINGLE_PRODUCT,
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Conversas');
    });

    test('Retorna recomendação correta com base nas features selecionadas', () => {
      const formData = {
        selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
        selectedRecommendationType: SINGLE_PRODUCT,
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Conversas');
    });

    test('Retorna apenas um produto com mais de um produto de match', () => {
      const formData = {
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Automação de marketing',
        ],
        selectedFeatures: [
          'Rastreamento de interações com clientes',
          'Rastreamento de comportamento do usuário',
        ],
        selectedRecommendationType: SINGLE_PRODUCT,
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Station Marketing');
    });

    test('Retorna o último match em caso de empate', () => {
      const formData = {
        selectedPreferences: [
          'Automação de marketing',
          'Integração com chatbots',
        ],
        selectedRecommendationType: SINGLE_PRODUCT,
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations[0].name).toBe('RD Conversas');
    });
  });

  describe('MultipleProducts', () => {
    test('Retorna recomendações corretas com base nas preferências selecionadas', () => {
      const formData = {
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Personalização de funis de vendas',
          'Automação de marketing',
        ],
        selectedFeatures: [
          'Rastreamento de interações com clientes',
          'Rastreamento de comportamento do usuário',
        ],
        selectedRecommendationType: MULTIPLE_PRODUCTS,
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(2);
      expect(recommendations.map((product) => product.name)).toEqual([
        'RD Station CRM',
        'RD Station Marketing',
      ]);
    });

    test('Retorna recomendações corretas com base nas features selecionadas', () => {
      const formData = {
        selectedFeatures: [
          'Gestão de conversas em diferentes canais',
          'Recomendação de ações com base em padrões',
        ],
        selectedRecommendationType: MULTIPLE_PRODUCTS,
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(2);
      expect(recommendations.map((product) => product.name)).toEqual([
        'RD Conversas',
        'RD Mentor AI',
      ]);
    });
  });
});
