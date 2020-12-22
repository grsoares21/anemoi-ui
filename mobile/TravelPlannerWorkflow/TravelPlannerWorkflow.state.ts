import { createContext } from 'react';
import { CityStayPeriod, DateRange } from './TravelPlannerWorkflow.d';
import { City, TravelPlanResult } from '@anemoi-ui/services';

export type TravelPlannerWorkflowState = {
  departureCities: City[];
  arrivalCities: City[];
  visitingCities: CityStayPeriod[];
  departureDateRange: DateRange;
  arrivalDateRange: DateRange;
  travelPlanResult?: TravelPlanResult;
  preferredCriteria: 'price' | 'quality' | 'duration';
  noOfTravelers: number;
  maxStopsPerRoute: number;
};

export type TravelPlannerWorkflowAction =
  | { type: 'setDepartureCities'; cities: City[] }
  | { type: 'setArrivalCities'; cities: City[] }
  | { type: 'setVisitingCities'; cities: CityStayPeriod[] }
  | { type: 'setDateRanges'; dateRanges: { departureDateRange: DateRange; arrivalDateRange: DateRange } }
  | { type: 'setTravelPlanResult'; result: TravelPlanResult }
  | { type: 'setPreferredCritera'; criteria: 'price' | 'quality' | 'duration' }
  | { type: 'setNoOfTravelers'; noOfTravelers: number }
  | { type: 'setMaxStopsPerRoute'; maxStops: number };

export const TravelPlannerWorkflowReducer = (
  state: TravelPlannerWorkflowState,
  action: TravelPlannerWorkflowAction
): TravelPlannerWorkflowState => {
  switch (action.type) {
    case 'setArrivalCities':
      return { ...state, arrivalCities: action.cities };
    case 'setDepartureCities':
      return { ...state, departureCities: action.cities };
    case 'setVisitingCities':
      return { ...state, visitingCities: action.cities };
    case 'setDateRanges':
      return { ...state, ...action.dateRanges };
    case 'setTravelPlanResult':
      return { ...state, travelPlanResult: action.result };
    case 'setPreferredCritera':
      return { ...state, preferredCriteria: action.criteria };
    case 'setNoOfTravelers':
      return { ...state, noOfTravelers: action.noOfTravelers };
    case 'setMaxStopsPerRoute':
      return { ...state, maxStopsPerRoute: action.maxStops };
    default:
      return { ...state };
  }
};

export type TravelPlannerWorkflowContext = {
  state: TravelPlannerWorkflowState;
  dispatch: (action: TravelPlannerWorkflowAction) => void;
};

export const TravelPlannerWorkflowContext = createContext<TravelPlannerWorkflowContext>({
  state: {
    departureCities: [],
    arrivalCities: [],
    visitingCities: [],
    departureDateRange: { startDate: null, endDate: null },
    arrivalDateRange: { startDate: null, endDate: null },
    maxStopsPerRoute: 5,
    noOfTravelers: 1,
    preferredCriteria: 'price'
  },
  dispatch: _action => {}
});
