export default class Recommendation {
  constructor(product, preferencesTotalOccurrences, featuresTotalOccurrences) {
    this.id = product.id;
    this.name = product.name;
    this.totalOccurrences =
      preferencesTotalOccurrences + featuresTotalOccurrences;
  }
}
