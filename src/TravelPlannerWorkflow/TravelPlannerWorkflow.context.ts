import { createContext } from 'react';
import { TravelPlannerWorkflowState, TravelPlannerWorkflowAction } from './TravelPlannerWorkflow.d';

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
    arrivalDateRange: { startDate: null, endDate: null }
  },
  dispatch: _action => {}
});
