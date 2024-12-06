import React from 'react';
import Checkbox from '../../shared/Checkbox';

function RecommendationType({ onRecommendationTypeChange }) {
  return (
    <div className="mb-4" data-testid="recommendation">
      <h2 className="text-lg font-bold mb-2">Tipo de Recomendação:</h2>
      <div className="flex items-center">
        <Checkbox
          type="radio"
          name="recommendationType"
          value="SingleProduct"
          onChange={() => onRecommendationTypeChange('SingleProduct')}
          className="mr-2"
          data-testid="recommendation-single-product"
        />
        <label htmlFor="SingleProduct" className="mr-4">
          Produto Único
        </label>
        <Checkbox
          type="radio"
          name="recommendationType"
          value="MultipleProducts"
          onChange={() => onRecommendationTypeChange('MultipleProducts')}
          className="mr-2"
          data-testid="recommendation-multiple-products"
        />
        <label htmlFor="MultipleProducts">Múltiplos Produtos</label>
      </div>
    </div>
  );
}

export default RecommendationType;
