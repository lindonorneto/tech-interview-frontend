// Form.js

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from '../../hooks/useForm';
import useProducts from '../../hooks/useProducts';
import useRecommendations from '../../hooks/useRecommendations';
import { Features, Preferences, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import { REQUIRED_FIELD_ERROR } from '../../shared/constants';

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

    if (!isValidForm()) return;

    setRecommendations(getRecommendations(formData));
  };

  const isValidForm = () => {
    if (
      !formData.selectedPreferences.length &&
      !formData.selectedFeatures.length
    ) {
      toast.error(REQUIRED_FIELD_ERROR.PREFERENCES_FEATURES);
      return false;
    }

    if (!formData.selectedRecommendationType) {
      toast.error(REQUIRED_FIELD_ERROR.RECOMMENDATION_TYPE);
      return false;
    }

    return true;
  };

  return (
    <>
      <ToastContainer />

      <form
        className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <Preferences
          preferences={preferences}
          onPreferenceChange={(selected) =>
            handleChange('selectedPreferences', selected)
          }
        />

        <Features
          features={features}
          onFeatureChange={(selected) =>
            handleChange('selectedFeatures', selected)
          }
        />

        <RecommendationType
          onRecommendationTypeChange={(selected) =>
            handleChange('selectedRecommendationType', selected)
          }
        />

        <SubmitButton text="Obter recomendação" />
      </form>
    </>
  );
}

export default Form;
