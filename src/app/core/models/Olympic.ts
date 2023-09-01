import { Participation } from './Participation';

/**
 * Model representing an Olympic event.
 */
export class Olympic {
  /**
   * Create an Olympic event.
   * @param {number} id - The ID of the Olympic event.
   * @param {string} country - The country participating in the event.
   * @param {Participation[]} participations - The participations of the country in the event.
   */
  constructor(
    public id: number,
    public country: string,
    public participations: Participation[]
  ) {}
}
