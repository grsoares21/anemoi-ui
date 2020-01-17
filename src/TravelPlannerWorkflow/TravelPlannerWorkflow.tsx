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
import { WorkflowSection } from './TravelPlannerWorkflow.d';
import { CurrencyContext } from './../Shared/CurrecyContext';
import moment from 'moment';
import { CookieBot } from './../Shared/Cookiebot.d';
import {
  TravelPlannerWorkflowContext,
  TravelPlannerWorkflowState,
  TravelPlannerWorkflowReducer
} from './TravelPlannerWorkflow.state';
import AdvancedFiltersSidebar from './AdvancedFiltersSidebar/AdvancedFiltersSidebar';

declare var gtag: Gtag.Gtag;
declare var Cookiebot: CookieBot;

const areParametersValid = (state: TravelPlannerWorkflowState): boolean => {
  let areDatesValid = false;

  if (
    state.departureDateRange.startDate &&
    state.departureDateRange.endDate &&
    state.arrivalDateRange.startDate &&
    state.arrivalDateRange.endDate
  ) {
    const minTravelDays = state.visitingCities.reduce((accumulator, cityStayPeriod) => {
      return accumulator + cityStayPeriod.minDays;
    }, 0);
    const maxTravelDays = state.visitingCities.reduce((accumulator, cityStayPeriod) => {
      return accumulator + cityStayPeriod.maxDays;
    }, 0);

    const minArrivalDate = moment(state.departureDateRange.startDate).add(minTravelDays, 'days');
    const maxArrivalDate = moment(state.departureDateRange.endDate).add(maxTravelDays, 'days');

    areDatesValid =
      moment(state.arrivalDateRange.startDate).isSameOrAfter(minArrivalDate) &&
      moment(state.arrivalDateRange.endDate).isSameOrBefore(maxArrivalDate);
  }

  const areCitiesValid =
    state.departureCities.length !== 0 && state.arrivalCities.length !== 0 && state.visitingCities.length !== 0;

  return areCitiesValid && areDatesValid;
};

type TravelPlannerWorkflowProps = {
  launchWorkflow: boolean;
};

const TravelPlannerWorkflow: React.FC<TravelPlannerWorkflowProps> = props => {
  const { t, i18n } = useTranslation();
  const { currency } = useContext(CurrencyContext);

  const sendTravelPlanRequest = (state: TravelPlannerWorkflowState) =>
    AnemoiServices.calculateTravelPlan({
      currency,
      locale: i18n.language.split('-')[1].toLocaleLowerCase(),
      departureCities: state.departureCities.map(city => city.id),
      arrivalCities: state.arrivalCities.map(city => city.id),
      visitingCities: state.visitingCities.map(cityStayPeriod => {
        return { cityId: cityStayPeriod.city.id, stayPeriod: [cityStayPeriod.minDays, cityStayPeriod.maxDays] };
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

  const [state, dispatch] = useReducer(TravelPlannerWorkflowReducer, {
    departureCities: [],
    arrivalCities: [],
    visitingCities: [],
    departureDateRange: { startDate: null, endDate: null },
    arrivalDateRange: { startDate: null, endDate: null }
  });

  const submitButtonRef = useRef<any>(null);

  let [workflowSection, setWorkflowSection] = useState(WorkflowSection.Beginning);
  let updateWorkflowSection = (newSection: WorkflowSection) => {
    if (Cookiebot?.consent?.statistics) {
      gtag('event', WorkflowSection[newSection], {
        event_category: 'workflow_navigation'
      });
    }
    setWorkflowSection(newSection);
    setTimeout(
      () =>
        animateScroll.scrollToBottom({
          containerId: 'WorkflowContent',
          isDynamic: true,
          duration: 500
        }),
      100
    );
  };
  // to prevent coming backwards on the steps when re-executing animations' end callback

  useEffect(() => {
    if (!props.launchWorkflow) return;
    let timeOutToClear: ReturnType<typeof setTimeout>;
    switch (workflowSection) {
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
  }, [workflowSection, props.launchWorkflow]);

  useEffect(() => {
    if (workflowSection > WorkflowSection.CalculateTravelPlan) {
      updateWorkflowSection(WorkflowSection.CalculateTravelPlan);
    }
    // eslint-disable-next-line
  }, [currency]);

  let [loadingDots, setLoadingDots] = useState('.');
  return (
    <div className="TravelPlannerWorkflow" style={{ display: props.launchWorkflow ? 'block' : 'none' }}>
      <AdvancedFiltersSidebar>
        <div id="WorkflowContent">
          <div className="FaderGradient"></div>
          <TravelPlannerWorkflowContext.Provider value={{ state, dispatch }}>
            <Container>
              <Row>
                <Col xs={{ span: 12 }} md={{ span: 8, offset: 2 }}>
                  <br />
                  <br />
                  <br />
                  <WorkflowStep isVisible={props.launchWorkflow} uniqueKey="letsGo">
                    <h4>{t('GREAT_HERE_WE_GO')}</h4>
                  </WorkflowStep>
                  <WorkflowStep
                    isVisible={workflowSection >= WorkflowSection.CitySelection}
                    uniqueKey="citySelectionWorkflow"
                  >
                    <CitySelectionWorkflow
                      onComplete={() => updateWorkflowSection(WorkflowSection.StayPeriodIntroduction)}
                    />
                  </WorkflowStep>
                  <br />
                  <WorkflowStep
                    isVisible={workflowSection >= WorkflowSection.StayPeriodIntroduction}
                    uniqueKey="needStayPeriods"
                  >
                    <h4>{t('SOUNDS_LIKE_A_GOOD_PLAN')}</h4>
                    <h4>{t('HOW_MANY_DAYS_IN_EACH_CITY')}</h4>
                  </WorkflowStep>
                  <WorkflowStep
                    isVisible={workflowSection >= WorkflowSection.StayPeriod}
                    uniqueKey="stayPeriodWorkflow"
                  >
                    <StayPeriodWorkflow onComplete={() => updateWorkflowSection(WorkflowSection.TravelPeriod)} />
                  </WorkflowStep>
                  <br />
                  <br />
                  <WorkflowStep
                    isVisible={workflowSection >= WorkflowSection.TravelPeriod}
                    uniqueKey="travelPeriodWorkflow"
                  >
                    <h4>{t('NOTED')}</h4>
                    <h4>
                      <em>{t('WHEN_ARE_PLANNING_THIS_TRIP_FOR')}</em>
                    </h4>
                    <TravelPeriodWorkflow
                      onComplete={() => {
                        if (workflowSection < WorkflowSection.CalculateTravelPlan) {
                          updateWorkflowSection(WorkflowSection.CalculateTravelPlan);
                        }
                      }}
                    />
                  </WorkflowStep>
                  <br />
                  <WorkflowStep
                    isVisible={workflowSection >= WorkflowSection.CalculateTravelPlan}
                    uniqueKey="calculateRoute"
                  >
                    <Button
                      size="lg"
                      block
                      ref={submitButtonRef}
                      disabled={!areParametersValid(state)}
                      onClick={() => {
                        updateWorkflowSection(WorkflowSection.CalculatingTravelPlan);
                        var loadingDotsInterval = setInterval(() => setLoadingDots(prevDots => prevDots + '.'), 800);

                        sendTravelPlanRequest(state)
                          .then(result => {
                            dispatch({ type: 'setTravelPlanResult', result });
                          })
                          .catch(err => console.log(err))
                          .finally(() => {
                            clearInterval(loadingDotsInterval);
                            updateWorkflowSection(WorkflowSection.TravelPlanResult);
                          });
                      }}
                    >
                      <b>{t('CALCULATE_TRAVEL_PLAN')}</b>
                    </Button>
                  </WorkflowStep>
                  <br />
                  <WorkflowStep
                    isVisible={workflowSection >= WorkflowSection.CalculatingTravelPlan}
                    uniqueKey="calculatingTravelPlan"
                  >
                    <h4>
                      <em>{t('PERFECT')}</em>
                    </h4>
                    <h4>{t('WE_ARE_CALCULATING_THE_BEST_ROUTE', { loadingDots })}</h4>
                  </WorkflowStep>
                  <WorkflowStep
                    isVisible={workflowSection >= WorkflowSection.TravelPlanResult}
                    uniqueKey="travelPlanResult"
                  >
                    {state.travelPlanResult && <TravelPlanResult result={state.travelPlanResult} />}
                    {!state.travelPlanResult && (
                      <h4>
                        <em>{t('SORRY_NO_ROUTE_FOUND')}</em>
                      </h4>
                    )}
                  </WorkflowStep>
                  <br />
                  <br />
                </Col>
              </Row>
            </Container>
          </TravelPlannerWorkflowContext.Provider>
        </div>
      </AdvancedFiltersSidebar>
    </div>
  );
};

export default TravelPlannerWorkflow;
