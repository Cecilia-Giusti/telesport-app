import { Participation } from 'src/app/core/models/Participation';

export const getAthletes = (participations: Participation[]) => {
  let totalAthletes = participations.reduce(
    (sum, participation) => sum + participation.athleteCount,
    0
  );

  return totalAthletes;
};
