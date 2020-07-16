import './WorkflowStep.scss';

import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import useTheme from '../../Shared/useTheme';

const WorkflowStepAnimation = posed.div({
  exit: { opacity: 0, marginTop: '-10px' },
  enter: {
    opacity: 1,
    marginTop: '0px',
    transition: { ease: 'easeOut', duration: 300 }
  }
});

interface WorkflowStepProps {
  isVisible: boolean;
  onAnimationEnd?: () => any;
  uniqueKey: string;
}

const WorkflowStep: React.FC<WorkflowStepProps> = props => {
  const themeClass = useTheme();

  return (
    <div className={`WorkflowStep ${themeClass}`}>
      <PoseGroup>
        {props.isVisible && (
          <WorkflowStepAnimation key={props.uniqueKey} onPoseComplete={props.onAnimationEnd}>
            {props.children}
          </WorkflowStepAnimation>
        )}
      </PoseGroup>
    </div>
  );
};

export default WorkflowStep;
