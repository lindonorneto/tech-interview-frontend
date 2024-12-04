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

  const filterProducts = products.reduce((accumulator, currentValue) => {
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
    if (areAllTotalsEquals(filterProducts, highestTotal)) {
      return getLastItem(filterProducts);
    }
  }

  return filterProducts;
};

const getPreferencesTotalOccurrences = (product, selectedPreferences) =>
  product.preferences.reduce((acc, cur) => {
    const find = selectedPreferences.find(
      (selectedPreference) => selectedPreference === cur
    );

    if (find) {
      acc = +1;
    }

    return acc;
  }, 0);

const getFeaturesTotalOccurrences = (product, selectedFeatures) =>
  product.features.reduce((acc, cur) => {
    const find = selectedFeatures.find(
      (selectedFeature) => selectedFeature === cur
    );

    if (find) {
      acc = +1;
    }

    return acc;
  }, 0);

const getHighestTotal = (result) =>
  result.reduce((acc, cur) => {
    return cur.total > acc ? cur.total : acc;
  }, 0);

const isSingleProduct = (selectedRecommendationType) =>
  selectedRecommendationType === SINGLE_PRODUCT;

const areAllTotalsEquals = (products, highestTotal) =>
  products.every((data) => {
    return Object.values(data).includes(highestTotal);
  });

const getLastItem = (products) => [products[products.length - 1]];

export default { getRecommendations };
