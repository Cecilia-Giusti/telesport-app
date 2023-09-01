import { Participation } from 'src/app/core/models/Participation';

/**
 * This function calculates the total number of athletes from an array of participations.
 *
 * @param {Participation[]} participations - An array of Participation objects.
 * @return {number} The total number of athletes.
 *
 */
export const getAthletes = (participations: Participation[]): number => {
  let totalAthletes = participations.reduce(
    (sum, participation) => sum + participation.athleteCount,
    0
  );

  return totalAthletes;
};
