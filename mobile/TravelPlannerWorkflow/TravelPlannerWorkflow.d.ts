import { City } from '@anemoi-ui/services';

export type CityStayPeriod = {
  city: City;
  minDays: number;
  maxDays: number;
};

export type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

export enum WorkflowSection {
  Beginning = 0,
  CitySelection = 1,
  StayPeriodIntroduction = 2,
  StayPeriod = 3,
  TravelPeriod = 4,
  CalculateTravelPlan = 5,
  CalculatingTravelPlan = 6,
  TravelPlanResult = 7
}
