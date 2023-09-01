/**
 * Model representing a participation in an Olympic event.
 */
export class Participation {
  /**
   * Create a participation.
   * @param {number} id - The ID of the participation.
   * @param {number} year - The year of the Olympic event.
   * @param {string} city - The city where the Olympic event took place.
   * @param {number} medalsCount - The count of medals won in the event.
   * @param {number} athleteCount - The count of athletes participated in the event.
   */
  constructor(
    public id: number,
    public year: number,
    public city: string,
    public medalsCount: number,
    public athleteCount: number
  ) {}
}
