/**
 * Model representing a data point.
 */
export class DataPoint {
  /**
   * Create a data point.
   * @param {string} name - The name of the data point.
   * @param {number} value - The value of the data point.
   */
  constructor(public name: string, public value: number) {}
}

/**
 * Model representing a country line.
 */
export class CountryLine {
  /**
   * Create a country line.
   * @param {string} name - The name of the country.
   * @param {DataPoint[] | undefined} series - The series of data points.
   */
  constructor(public name: string, public series: DataPoint[] | undefined) {}
}
