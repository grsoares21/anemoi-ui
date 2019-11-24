import { createContext } from 'react';
import { CityStayPeriod, DateRange } from './TravelPlannerWorkflow.d';
import { City } from '../Services/LocationServices';
import TravelPlanResult from '../Services/AnemoiServices/TravelPlanResult';

export type TravelPlannerWorkflowContext = {
  state: TravelPlannerWorkflowState;
  dispatch: (action: TravelPlannerWorkflowAction) => void;
};

export type TravelPlannerWorkflowState = {
  departureCities: City[];
  arrivalCities: City[];
  visitingCities: CityStayPeriod[];
  departureDateRange: DateRange;
  arrivalDateRange: DateRange;
  travelPlanResult?: TravelPlanResult;
};

export type TravelPlannerWorkflowAction =
  | { type: 'setDepartureCities'; cities: City[] }
  | { type: 'setArrivalCities'; cities: City[] }
  | { type: 'setVisitingCities'; cities: CityStayPeriod[] }
  | { type: 'setDateRanges'; dateRanges: { departureDateRange: DateRange; arrivalDateRange: DateRange } }
  | { type: 'setTravelPlanResult'; result: TravelPlanResult };

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
    default:
      return { ...state };
  }
};

export const TravelPlannerWorkflowContext = createContext<TravelPlannerWorkflowContext>({
  state: {
    departureCities: [],
    arrivalCities: [],
    visitingCities: [],
    departureDateRange: { startDate: null, endDate: null },
    arrivalDateRange: { startDate: null, endDate: null }
  },
  dispatch: _action => {}
});
