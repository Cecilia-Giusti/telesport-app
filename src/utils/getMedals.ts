import { Participation } from 'src/app/core/models/Participation';

/**
 * This function calculates the total number of medals from an array of participations.
 *
 * @param {Participation[]} participations - An array of Participation objects.
 * @return {number} The total number of medals.
 */
export const getMedals = (participations: Participation[]): number => {
  let totalMedals = participations.reduce(
    (sum, participation) => sum + participation.medalsCount,
    0
  );

  return totalMedals;
};
