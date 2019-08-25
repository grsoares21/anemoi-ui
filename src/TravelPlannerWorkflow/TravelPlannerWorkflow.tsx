import './TravelPlannerWorkflow.scss';

import React, { useState, useRef } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { animateScroll } from 'react-scroll';

import WorkflowStep from './WorkflowStep/WorkflowStep';
import CitySelectionWorkflow, { SelectedCities } from './CitySelectionWorkflow';
import StayPeriodWorkflow, { CityToStayPeriodMapping } from './StayPeriodWorkflow/StayPeriodWorkflow';
import TravelPlanResult from './TravelPlanResult/TravelPlanResult';
import TravelPeriodWorkflow from './TravelPeriodWorkflow/TravelPeriodWorkflow';

import AnemoiServices from '../Services/AnemoiServices/AnemoiServices';
import { DateRange } from '../Services/AnemoiServices/TravelPlanParameters';

interface TravelPlannerWorkflowProps {
  launchWorkflow: boolean
}

const TravelPlannerWorkflow: React.FC<TravelPlannerWorkflowProps> = props => {
  let [selectedCities, setSelectedCities] = useState<SelectedCities>({
    departureCities: [],
    visitingCities: [],
    arrivalCities: []
  });
  let [stayPeriods, setStayPeriods] = useState<CityToStayPeriodMapping>({});

  let [[departureDateRange, arrivalDateRange], setDateRanges] = useState<[DateRange, DateRange]>([{startDate: "", endDate: ""}, {startDate: "", endDate: ""}]);

  const submitButtonRef = useRef<any>(null);

  let [workflowStep, setWorkflowStep] = useState(0);
  let updateWorkflowStep = (step: number) => {
    if(step > workflowStep) {
      setWorkflowStep(step);
      setTimeout(() => animateScroll.scrollToBottom({containerId: "TravelPlannerWorkflow", isDynamic: true, duration: 500}), 100);
    }
  }
  // to prevent coming backwards on the steps when re-executing animations' end callback

  let [loadingDots, setLoadingDots] = useState('.');
  return (
    <div id="TravelPlannerWorkflow" style={{display: props.launchWorkflow ? 'block' : 'none'}}>
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
              <CitySelectionWorkflow onComplete={(cities) => {setSelectedCities(cities); updateWorkflowStep(2)}} />
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
                cities={selectedCities.visitingCities}
                onComplete={(cityPeriods) => {setStayPeriods(cityPeriods); updateWorkflowStep(4)}} />
            </WorkflowStep>
            <br />
            <br />
            <WorkflowStep
              isVisible={workflowStep >= 4}
              uniqueKey="travelPeriodWorkflow">
              <h4>Anotado!</h4>
              <h4><em>Para quando você está planejando esta viagem?</em></h4>
              <TravelPeriodWorkflow
                minTravelDays={Object.entries(stayPeriods).reduce((accumulator, [, cityStayPeriod]) => {
                    return accumulator + cityStayPeriod.minDays;
                }, 0)}
                maxTravelDays={Object.entries(stayPeriods).reduce((accumulator, [, cityStayPeriod]) => {
                    return accumulator + cityStayPeriod.maxDays;
                }, 0)}
                onComplete={(departureDateRange, arrivalDateRange) => {
                  updateWorkflowStep(6);
                  setDateRanges([departureDateRange, arrivalDateRange]);
                }} />
            </WorkflowStep>
            <br />
            <WorkflowStep
              isVisible={workflowStep >= 6}
              uniqueKey="calculateRoute"
              onAnimationEnd={() => submitButtonRef.current.focus()}>
              <Button size="lg" block ref={submitButtonRef}
                onClick={() => {
                  updateWorkflowStep(7);
                  var loadingDotsInterval = setInterval(() => setLoadingDots(prevDots => prevDots + '.'), 800);

                  AnemoiServices.calculateTravelPlan({
                    departureCities: selectedCities.departureCities.map(city => city.id),
                    arrivalCities: selectedCities.arrivalCities.map(city => city.id),
                    visitingCities: selectedCities.visitingCities.map(city => {
                      let cityStayPeriod = stayPeriods[city.id];
                      return {cityId: city.id, stayPeriod: [cityStayPeriod.minDays, cityStayPeriod.maxDays]}
                    }),
                    departureDateRange,
                    arrivalDateRange
                  }).then(() => {
                    clearInterval(loadingDotsInterval);
                    updateWorkflowStep(8);
                  }).catch(err => console.log(err));
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
            <TravelPlanResult isVisible={workflowStep >= 8} />
            <br /><br />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TravelPlannerWorkflow;