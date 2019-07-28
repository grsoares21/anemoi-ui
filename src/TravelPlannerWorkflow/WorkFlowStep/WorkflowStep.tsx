import './WorkflowStep.scss'

import React, { useState } from 'react';
import posed, { PoseGroup } from 'react-pose';

const WorkflowStepAnimation = posed.div({
  exit: { opacity: 0, marginTop: '-10px' },
  enter: {
    opacity: 1,
    marginTop: '0px',
    transition: { ease: 'easeOut', duration: 300 }
  }
});

interface WorkflowStepProps {
  isFocused?: boolean;
  isVisible: boolean;
  onAnimationEnd?: () => any;
  uniqueKey: string;
}

const WorkflowStep: React.FC<WorkflowStepProps> = props => {
  let [animationComplete, setAnimationComplete] = useState(false);

  return (
    <div className="WorkflowStep">
      <PoseGroup className="WorkflowStep">
        {props.isVisible &&
          <WorkflowStepAnimation
            key={props.uniqueKey}
            onPoseComplete={() => {
              if(props.onAnimationEnd && !animationComplete) {
                // onPoseComplete has a bug that makes it re-execute at every re-render
                // this hack prevents it
                setAnimationComplete(true);
                props.onAnimationEnd();
              }
            }}
            className={props.isFocused ? 'FocusedStep' : ''}>
            {props.children}
          </WorkflowStepAnimation>
        }
        </PoseGroup>
      </div>
  );
}

export default WorkflowStep;
