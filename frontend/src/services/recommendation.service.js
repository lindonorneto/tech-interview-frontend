// getRecommendations.js

import Recommendation from '../model/Recommendation';
import { SINGLE_PRODUCT } from '../shared/constants';

const getRecommendations = (
  formData = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  },
  products
) => {
  let preferencesTotalOccurrences = 0;
  let featuresTotalOccurrences = 0;
  let highestTotal = 0;

  if (
    !formData?.selectedFeatures?.length &&
    !formData?.selectedPreferences?.length
  )
    return [];

  const filteredProducts = products.reduce((accumulator, currentValue) => {
    if (formData?.selectedPreferences) {
      preferencesTotalOccurrences = getPreferencesTotalOccurrences(
        currentValue,
        formData?.selectedPreferences
      );
    }

    if (formData?.selectedFeatures) {
      featuresTotalOccurrences = getFeaturesTotalOccurrences(
        currentValue,
        formData?.selectedFeatures
      );
    }

    if (preferencesTotalOccurrences >= 1 || featuresTotalOccurrences >= 1) {
      accumulator.push(
        new Recommendation(
          currentValue,
          preferencesTotalOccurrences,
          featuresTotalOccurrences
        )
      );
    }

    if (isSingleProduct(formData.selectedRecommendationType)) {
      highestTotal = getHighestTotal(accumulator);
    }

    return accumulator;
  }, []);

  if (isSingleProduct(formData.selectedRecommendationType)) {
    return singleProduct(filteredProducts, highestTotal);
  }

  return filteredProducts;
};

const getPreferencesTotalOccurrences = (product, selectedPreferences) =>
  product.preferences.reduce((accumulator, currentValue) => {
    const findPreference = selectedPreferences.find(
      (selectedPreference) => selectedPreference === currentValue
    );

    if (findPreference) {
      accumulator += 1;
    }

    return accumulator;
  }, 0);

const getFeaturesTotalOccurrences = (product, selectedFeatures) =>
  product.features.reduce((accumulator, currentValue) => {
    const findFeature = selectedFeatures.find(
      (selectedFeature) => selectedFeature === currentValue
    );

    if (findFeature) {
      accumulator += 1;
    }

    return accumulator;
  }, 0);

const getHighestTotal = (result) =>
  result.reduce((accumulator, currentValue) => {
    return currentValue.totalOccurrences > accumulator
      ? currentValue.totalOccurrences
      : accumulator;
  }, 0);

const isSingleProduct = (selectedRecommendationType) =>
  selectedRecommendationType === SINGLE_PRODUCT;

const singleProduct = (filteredProducts, highestTotal) => {
  const itemsWithHighestTotal = filteredProducts.reduce(
    (accumulator, currentValue) => {
      if (currentValue.totalOccurrences === highestTotal) {
        accumulator.push(currentValue);
      }

      return accumulator;
    },
    []
  );

  if (itemsWithHighestTotal.length === 1) {
    return itemsWithHighestTotal;
  }

  return getLastItem(itemsWithHighestTotal);
};

const getLastItem = (products) => [products[products.length - 1]];

export default { getRecommendations };
