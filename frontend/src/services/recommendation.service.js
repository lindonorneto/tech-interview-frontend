// getRecommendations.js

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
      accumulator.push({
        id: currentValue.id,
        name: currentValue.name,
        total: preferencesTotalOccurrences + featuresTotalOccurrences,
      });
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
  product.preferences.reduce((acc, cur) => {
    const findPreference = selectedPreferences.find(
      (selectedPreference) => selectedPreference === cur
    );

    if (findPreference) {
      acc += 1;
    }

    return acc;
  }, 0);

const getFeaturesTotalOccurrences = (product, selectedFeatures) =>
  product.features.reduce((acc, cur) => {
    const findFeature = selectedFeatures.find(
      (selectedFeature) => selectedFeature === cur
    );

    if (findFeature) {
      acc += 1;
    }

    return acc;
  }, 0);

const getHighestTotal = (result) =>
  result.reduce((acc, cur) => {
    return cur.total > acc ? cur.total : acc;
  }, 0);

const isSingleProduct = (selectedRecommendationType) =>
  selectedRecommendationType === SINGLE_PRODUCT;

const singleProduct = (filteredProducts, highestTotal) => {
  const itemsWithHighestTotal = filteredProducts.reduce((acc, cur) => {
    if (cur.total === highestTotal) {
      acc.push(cur);
    }

    return acc;
  }, []);

  if (itemsWithHighestTotal.length === 1) {
    return itemsWithHighestTotal;
  }

  return getLastItem(itemsWithHighestTotal);
};

const getLastItem = (products) => [products[products.length - 1]];

export default { getRecommendations };
