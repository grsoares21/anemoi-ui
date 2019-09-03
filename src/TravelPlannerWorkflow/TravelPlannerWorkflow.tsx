import './TravelPlannerWorkflow.scss';

import React, { useState, useRef, useReducer, useEffect } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { animateScroll } from 'react-scroll';

import WorkflowStep from './WorkflowStep/WorkflowStep';
import CitySelectionWorkflow from './CitySelectionWorkflow/CitySelectionWorkflow';
import StayPeriodWorkflow from './StayPeriodWorkflow/StayPeriodWorkflow';
import TravelPlanResult from './TravelPlanResult/TravelPlanResult';
import TravelPeriodWorkflow from './TravelPeriodWorkflow/TravelPeriodWorkflow';

import AnemoiServices from '../Services/AnemoiServices/AnemoiServices';
import { Action, State } from './TravelPlannerWorkflow.d';

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

const sendTravelPlanRequest = (state: State) => AnemoiServices.calculateTravelPlan({
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

type TravelPlannerWorkflowProps = {
  launchWorkflow: boolean
}

const TravelPlannerWorkflow: React.FC<TravelPlannerWorkflowProps> = props => {
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

  let [workflowStep, setWorkflowStep] = useState(0);
  let updateWorkflowStep = (step: number) => {
    if(step > workflowStep) {
      setWorkflowStep(step);
      setTimeout(() => animateScroll.scrollToBottom({containerId: "TravelPlannerWorkflow", isDynamic: true, duration: 500}), 100);
    }
  }
  // to prevent coming backwards on the steps when re-executing animations' end callback

  useEffect(() => {
    if(workflowStep === 6) {
      submitButtonRef.current.focus();
    }
  }, [workflowStep])

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
              uniqueKey="letsGo"
              onAnimationEnd={() => updateWorkflowStep(1)}>
              <h4>Ótimo, então vamos lá!</h4>
            </WorkflowStep>
            <WorkflowStep
              isVisible={workflowStep >= 1}
              uniqueKey="citySelectionWorkflow">
              <CitySelectionWorkflow
                departureCities={departureCities}
                arrivalCities={arrivalCities}
                visitingCities={visitingCities.map(vc => vc.city)}
                onComplete={() => updateWorkflowStep(2)}
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
              isVisible={workflowStep >= 2}
              uniqueKey="needStayPeriods"
              onAnimationEnd={() => updateWorkflowStep(3)}>
              <h4>Soa como um bom plano!</h4>
              <h4>
                Para te ajudar a planejar ele, vou precisar saber por volta
                de quantos dias você deseja ficar em cada cidade:
              </h4>
            </WorkflowStep>
            <WorkflowStep
              isVisible={workflowStep >= 3}
              uniqueKey="stayPeriodWorkflow">
              <StayPeriodWorkflow
                cityStayPeriods={visitingCities}
                onChange={cityStayPeriods => dispatch({type: 'setVisitingCities', cities: cityStayPeriods})}
                onComplete={() => updateWorkflowStep(4)}
                 />
            </WorkflowStep>
            <br />
            <br />
            <WorkflowStep
              isVisible={workflowStep >= 4}
              uniqueKey="travelPeriodWorkflow">
              <h4>Anotado!</h4>
              <h4><em>Para quando você está planejando esta viagem?</em></h4>
              <TravelPeriodWorkflow
                minTravelDays={visitingCities.reduce((accumulator, cityStayPeriod) => {
                    return accumulator + cityStayPeriod.minDays;
                }, 0)}
                maxTravelDays={visitingCities.reduce((accumulator, cityStayPeriod) => {
                    return accumulator + cityStayPeriod.maxDays;
                }, 0)}
                departureDateRange={departureDateRange}
                arrivalDateRange={arrivalDateRange}
                onComplete={() => updateWorkflowStep(6)}
                onChange={
                  (departureDateRange, arrivalDateRange) =>
                    dispatch({ type: 'setDateRanges', dateRanges: { departureDateRange, arrivalDateRange } })
                } />
            </WorkflowStep>
            <br />
            <WorkflowStep
              isVisible={workflowStep >= 6}
              uniqueKey="calculateRoute">
              <Button size="lg" block ref={submitButtonRef}
                onClick={() => {
                  updateWorkflowStep(7);
                  var loadingDotsInterval = setInterval(() => setLoadingDots(prevDots => prevDots + '.'), 800);

                  sendTravelPlanRequest(state)
                    .then(result => {
                      dispatch({ type: 'setTravelPlanResult', result })
                    })
                    .catch(err => console.log(err))
                    .finally(() => {
                      clearInterval(loadingDotsInterval);
                      updateWorkflowStep(8);
                    });
              }}>
                <b>Calcular Plano de Viagem</b>
              </Button>
            </WorkflowStep>
            <br />
            <WorkflowStep
              isVisible={workflowStep >= 7}
              uniqueKey="calculatingRoute">
              <h4><em>Perfeito!</em></h4>
              <h4>Estamos calculando a melhor rota para sua viagem{loadingDots}</h4>
            </WorkflowStep>
            <WorkflowStep
              isVisible={workflowStep >= 8}
              uniqueKey="travelPlanResult">
              {state.travelPlanResult && <TravelPlanResult result={state.travelPlanResult} />}
              {!state.travelPlanResult && <h4><em>Desculpe, nenhuma rota foi encontrada para sua viagem ;(</em></h4>}
            </WorkflowStep>
            <br /><br />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TravelPlannerWorkflow;