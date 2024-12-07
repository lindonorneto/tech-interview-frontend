import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';
import { MULTIPLE_PRODUCTS, SINGLE_PRODUCT } from '../shared/constants';
import Recommendation from '../model/Recommendation';

describe('recommendationService', () => {
  describe('SingleProduct', () => {
    test('Retorna recomendação correta com base na preferência e feature selecionada', () => {
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
      expect(recommendations).toEqual([
        new Recommendation({ id: 3, name: 'RD Conversas' }, 1, 1),
      ]);
    });

    test('Retorna recomendação correta com base nas preferências e features selecionadas', () => {
      let formData = {
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Automação de marketing',
          'Testes A/B para otimização de campanhas',
        ],
        selectedFeatures: [
          'Análise de dados para insights estratégicos',
          'Recomendação de ações com base em padrões',
          'Integração de funcionalidades preditivas nos produtos RD Station',
        ],
        selectedRecommendationType: SINGLE_PRODUCT,
      };

      let recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations).toEqual([
        new Recommendation({ id: 4, name: 'RD Mentor AI' }, 0, 3),
      ]);

      formData = {
        selectedPreferences: [
          'Integração fácil com ferramentas de e-mail',
          'Personalização de funis de vendas',
          'Automação de marketing',
          'Testes A/B para otimização de campanhas',
        ],
        selectedFeatures: ['Análise de dados para insights estratégicos'],
        selectedRecommendationType: SINGLE_PRODUCT,
      };

      recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations).toEqual([
        new Recommendation({ id: 2, name: 'RD Station Marketing' }, 2, 0),
      ]);
    });

    test('Retorna recomendação correta com base na feature selecionada', () => {
      const formData = {
        selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
        selectedRecommendationType: SINGLE_PRODUCT,
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(1);
      expect(recommendations).toEqual([
        new Recommendation({ id: 3, name: 'RD Conversas' }, 0, 1),
      ]);
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
      expect(recommendations).toEqual([
        new Recommendation({ id: 2, name: 'RD Station Marketing' }, 1, 1),
      ]);
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
      expect(recommendations).toEqual([
        new Recommendation({ id: 3, name: 'RD Conversas' }, 1, 0),
      ]);
    });

    test('Retorna vazio em caso de preferências e features vazias', () => {
      const formData = {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: SINGLE_PRODUCT,
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(0);
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
      expect(recommendations.map((product) => product)).toEqual([
        new Recommendation({ id: 1, name: 'RD Station CRM' }, 2, 1),
        new Recommendation({ id: 2, name: 'RD Station Marketing' }, 1, 1),
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
      expect(recommendations.map((product) => product)).toEqual([
        new Recommendation({ id: 3, name: 'RD Conversas' }, 0, 1),
        new Recommendation({ id: 4, name: 'RD Mentor AI' }, 0, 1),
      ]);
    });

    test('Retorna vazio em caso de preferências e features vazias', () => {
      const formData = {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: MULTIPLE_PRODUCTS,
      };

      const recommendations = recommendationService.getRecommendations(
        formData,
        mockProducts
      );

      expect(recommendations).toHaveLength(0);
    });
  });
});
