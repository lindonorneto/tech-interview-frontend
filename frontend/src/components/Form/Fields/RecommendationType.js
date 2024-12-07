import React from 'react';
import Checkbox from '../../shared/Checkbox';
import { MULTIPLE_PRODUCTS, SINGLE_PRODUCT } from '../../../shared/constants';

function RecommendationType({ onRecommendationTypeChange }) {
  return (
    <div className="mb-4" data-testid="recommendation">
      <h2 className="text-lg font-bold mb-2">Tipo de Recomendação:</h2>
      <div className="flex items-center">
        <Checkbox
          type="radio"
          name="recommendationType"
          value={SINGLE_PRODUCT}
          onChange={() => onRecommendationTypeChange(SINGLE_PRODUCT)}
          className="mr-2"
          data-testid="recommendation-single-product"
        />
        <label htmlFor={SINGLE_PRODUCT} className="mr-4">
          Produto Único
        </label>
        <Checkbox
          type="radio"
          name="recommendationType"
          value={MULTIPLE_PRODUCTS}
          onChange={() => onRecommendationTypeChange(MULTIPLE_PRODUCTS)}
          className="mr-2"
          data-testid="recommendation-multiple-products"
        />
        <label htmlFor={MULTIPLE_PRODUCTS}>Múltiplos Produtos</label>
      </div>
    </div>
  );
}

export default RecommendationType;
