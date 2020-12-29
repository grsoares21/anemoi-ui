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
  CitySelection = 0,
  StayPeriod = 1,
  TravelPeriod = 2,
  TravelPlanResult = 3
}
