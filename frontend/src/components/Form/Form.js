// Form.js

import React, { useMemo } from 'react';
import useForm from '../../hooks/useForm';
import useProducts from '../../hooks/useProducts';
import useRecommendations from '../../hooks/useRecommendations';
import { Features, Preferences, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';

function Form({ setRecommendations }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const { getRecommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecommendations(getRecommendations(formData));
  };

  const renderPreferences = useMemo(() => {
    return (
      <Preferences
        preferences={preferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
    );
  }, [preferences]);

  const renderFeatures = useMemo(() => {
    return (
      <Features
        features={features}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
    );
  }, [features]);

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      {renderPreferences}
      {renderFeatures}
      <RecommendationType
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />
      <SubmitButton text="Obter recomendação" />
    </form>
  );
}

export default Form;
