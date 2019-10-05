import './TravelPlannerWorkflow.scss';

import React, { useState, useRef, useReducer, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { animateScroll } from 'react-scroll';

import WorkflowStep from './WorkflowStep/WorkflowStep';
import CitySelectionWorkflow from './CitySelectionWorkflow/CitySelectionWorkflow';
import StayPeriodWorkflow from './StayPeriodWorkflow/StayPeriodWorkflow';
import TravelPlanResult from './TravelPlanResult/TravelPlanResult';
import TravelPeriodWorkflow from './TravelPeriodWorkflow/TravelPeriodWorkflow';

import AnemoiServices from '../Services/AnemoiServices/AnemoiServices';
import { Action, State, WorkflowSection } from './TravelPlannerWorkflow.d';
import { CurrencyContext } from './../Shared/CurrecyContext';

declare var gtag: Gtag.Gtag;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setArrivalCities':
      return { ...state, arrivalCities: action.cities };
    case 'setDepartureCities':
      return { ...state, departureCities: action.cities };
    case 'setVisitingCities':
        return { ...state, visitingCities: action.cities };
    case 'setDateRanges':
      return { ...state, ...action.dateRanges }
    case 'setTravelPlanResult':
      return { ...state, travelPlanResult: action.result }
    default:
      return { ...state };
  }
}

type TravelPlannerWorkflowProps = {
  launchWorkflow: boolean
}

const TravelPlannerWorkflow: React.FC<TravelPlannerWorkflowProps> = props => {
  const { t, i18n } = useTranslation();
  const { currency } = useContext(CurrencyContext);

  const sendTravelPlanRequest = (state: State) => AnemoiServices.calculateTravelPlan({
    currency,
    locale: i18n.language.split('-')[1].toLocaleLowerCase(),
    departureCities: state.departureCities.map(city => city.id),
    arrivalCities: state.arrivalCities.map(city => city.id),
    visitingCities: state.visitingCities.map(cityStayPeriod => {
      return {cityId: cityStayPeriod.city.id, stayPeriod: [cityStayPeriod.minDays, cityStayPeriod.maxDays]}
    }),
    departureDateRange: {
      startDate: (state.departureDateRange.startDate as Date).toISOString(),
      endDate: (state.departureDateRange.endDate as Date).toISOString()
    },
    arrivalDateRange: {
      startDate: (state.arrivalDateRange.startDate as Date).toISOString(),
      endDate: (state.arrivalDateRange.endDate as Date).toISOString()
    }
  });

  const [state, dispatch] =
    useReducer(reducer, {
      departureCities: [],
      arrivalCities: [],
      visitingCities: [],
      departureDateRange: { startDate: null, endDate: null },
      arrivalDateRange: { startDate: null, endDate: null },
    });
  const {departureCities, arrivalCities, visitingCities, departureDateRange, arrivalDateRange} = state;

  const submitButtonRef = useRef<any>(null);

  let [workflowSection, setWorkflowSection] = useState(WorkflowSection.Beginning);
  let updateWorkflowSection = (newSection: WorkflowSection) => {
    gtag('event', WorkflowSection[newSection], {
      event_category: 'workflow_navigation'
    });
    setWorkflowSection(newSection);
    setTimeout(() => animateScroll.scrollToBottom({
      containerId: "TravelPlannerWorkflow",
      isDynamic: true, duration: 500
    }), 100);
  }
  // to prevent coming backwards on the steps when re-executing animations' end callback

  useEffect(() => {
    if(!props.launchWorkflow) return;
    let timeOutToClear: ReturnType<typeof setTimeout>;
    switch(workflowSection) {
      // defines the side effects for each workflow step
      case WorkflowSection.Beginning:
        timeOutToClear = setTimeout(() => updateWorkflowSection(WorkflowSection.CitySelection), 300);
        break;
      case WorkflowSection.StayPeriodIntroduction:
        timeOutToClear = setTimeout(() => updateWorkflowSection(WorkflowSection.StayPeriod), 300);
        break;
      case WorkflowSection.CalculateTravelPlan:
        submitButtonRef.current.focus();
        break;
      default:
        break;
    }
    let cleanUpFunction = () => clearTimeout(timeOutToClear);
    return cleanUpFunction;
  }, [workflowSection, props.launchWorkflow])

  let [loadingDots, setLoadingDots] = useState('.');
  return (
    <div id="TravelPlannerWorkflow" style={{ display: props.launchWorkflow ? 'block' : 'none' }}>
      <div className="FaderGradient"></div>
      <Container>
        <Row>
          <Col xs={{ span: 12 }} md={{ span: 8, offset: 2 }}>
            <br /><br /><br />
            <WorkflowStep
              isVisible={props.launchWorkflow}
              uniqueKey="letsGo">
              <h4>{t('GREAT_HERE_WE_GO')}</h4>
            </WorkflowStep>
            <WorkflowStep
              isVisible={workflowSection >= WorkflowSection.CitySelection}
              uniqueKey="citySelectionWorkflow">
              <CitySelectionWorkflow
                departureCities={departureCities}
                arrivalCities={arrivalCities}
                visitingCities={visitingCities.map(vc => vc.city)}
                onComplete={() => updateWorkflowSection(WorkflowSection.StayPeriodIntroduction)}
                onSetDepartureCities={cities => dispatch({ type: 'setDepartureCities', cities: cities })}
                onSetArrivalCities={cities => dispatch({ type: 'setArrivalCities', cities: cities })}
                onClearVisitingCities={() => dispatch({ type: 'setVisitingCities', cities: [] })}
                onAddVisitingCity={city => dispatch({
                  type: 'setVisitingCities',
                  cities: [...visitingCities, {city: city, minDays: 3, maxDays: 5}]
                })}
                onRemoveVisitingCity={city => dispatch({
                  type: 'setVisitingCities',
                  cities: visitingCities.filter(cityPeriod => cityPeriod.city.id !== city.id)
                })} />
            </WorkflowStep>
            <br />
            <WorkflowStep
              isVisible={workflowSection >= WorkflowSection.StayPeriodIntroduction}
              uniqueKey="needStayPeriods">
              <h4>{t('SOUNDS_LIKE_A_GOOD_PLAN')}</h4>
              <h4>{t('HOW_MANY_DAYS_IN_EACH_CITY')}</h4>
            </WorkflowStep>
            <WorkflowStep
              isVisible={workflowSection >= WorkflowSection.StayPeriod}
              uniqueKey="stayPeriodWorkflow">
              <StayPeriodWorkflow
                cityStayPeriods={visitingCities}
                onChange={cityStayPeriods => dispatch({type: 'setVisitingCities', cities: cityStayPeriods})}
                onComplete={() => updateWorkflowSection(WorkflowSection.TravelPeriod)}
                 />
            </WorkflowStep>
            <br />
            <br />
            <WorkflowStep
              isVisible={workflowSection >= WorkflowSection.TravelPeriod}
              uniqueKey="travelPeriodWorkflow">
              <h4>{t('NOTED')}</h4>
              <h4><em>{t('WHEN_ARE_PLANNING_THIS_TRIP_FOR')}</em></h4>
              <TravelPeriodWorkflow
                minTravelDays={visitingCities.reduce((accumulator, cityStayPeriod) => {
                    return accumulator + cityStayPeriod.minDays;
                }, 0)}
                maxTravelDays={visitingCities.reduce((accumulator, cityStayPeriod) => {
                    return accumulator + cityStayPeriod.maxDays;
                }, 0)}
                departureDateRange={departureDateRange}
                arrivalDateRange={arrivalDateRange}
                onComplete={() => {
                  if(workflowSection < WorkflowSection.CalculateTravelPlan) {
                    updateWorkflowSection(WorkflowSection.CalculateTravelPlan)
                  }
                }}
                onChange={
                  (departureDateRange, arrivalDateRange) =>
                    dispatch({ type: 'setDateRanges', dateRanges: { departureDateRange, arrivalDateRange } })
                } />
            </WorkflowStep>
            <br />
            <WorkflowStep
              isVisible={workflowSection >= WorkflowSection.CalculateTravelPlan}
              uniqueKey="calculateRoute">
              <Button size="lg" block ref={submitButtonRef}
                onClick={() => {
                  updateWorkflowSection(WorkflowSection.CalculatingTravelPlan);
                  var loadingDotsInterval = setInterval(() => setLoadingDots(prevDots => prevDots + '.'), 800);

                  sendTravelPlanRequest(state)
                    .then(result => {
                      dispatch({ type: 'setTravelPlanResult', result })
                    })
                    .catch(err => console.log(err))
                    .finally(() => {
                      clearInterval(loadingDotsInterval);
                      updateWorkflowSection(WorkflowSection.TravelPlanResult);
                    });
              }}>
                <b>{t('CALCULATE_TRAVEL_PLAN')}</b>
              </Button>
            </WorkflowStep>
            <br />
            <WorkflowStep
              isVisible={workflowSection >= WorkflowSection.CalculatingTravelPlan}
              uniqueKey="calculatingTravelPlan">
              <h4><em>{t('PERFECT')}</em></h4>
              <h4>{t('WE_ARE_CALCULATING_THE_BEST_ROUTE', { loadingDots })}</h4>
            </WorkflowStep>
            <WorkflowStep
              isVisible={workflowSection >= WorkflowSection.TravelPlanResult}
              uniqueKey="travelPlanResult">
              {state.travelPlanResult && <TravelPlanResult result={state.travelPlanResult} />}
              {!state.travelPlanResult && <h4><em>{t('SORRY_NO_ROUTE_FOUND')}</em></h4>}
            </WorkflowStep>
            <br /><br />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TravelPlannerWorkflow;