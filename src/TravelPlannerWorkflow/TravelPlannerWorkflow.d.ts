import { City } from '../Services/LocationServices';
import TravelPlanResult from '../Services/AnemoiServices/TravelPlanResult';

export type CityStayPeriod = {
  city: City,
  minDays: number,
  maxDays: number
}

export type DateRange = {
  startDate: Date | null,
  endDate: Date | null
}

export type State = {
  departureCities: City[],
  arrivalCities: City[],
  visitingCities: CityStayPeriod[],
  departureDateRange: DateRange,
  arrivalDateRange: DateRange,
  travelPlanResult?: TravelPlanResult
}

export type Action =
  | { type: 'setDepartureCities', cities: City[] }
  | { type: 'setArrivalCities', cities: City[] }
  | { type: 'setVisitingCities', cities: CityStayPeriod[] }
  | { type: 'setDateRanges', dateRanges: { departureDateRange: DateRange, arrivalDateRange: DateRange } }
  | { type: 'setTravelPlanResult', result: TravelPlanResult }