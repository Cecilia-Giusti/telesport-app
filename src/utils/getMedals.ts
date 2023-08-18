import { Participation } from 'src/app/core/models/Participation';

export const getMedals = (participations: Participation[]) => {
  let totalMedals = participations.reduce(
    (sum, participation) => sum + participation.medalsCount,
    0
  );

  return totalMedals;
};
