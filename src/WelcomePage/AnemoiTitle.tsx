import React from 'react';

import posed, { PoseGroup } from 'react-pose';

const Title = posed.h3({
  exit: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { ease: 'linear', duration: 200 }
  }
});

interface AnemoiTitleProps {
  isVisible: boolean
}

const AnemoiTitle: React.FC<AnemoiTitleProps> = props => {

  return (
    <PoseGroup>
      {props.isVisible &&
        <Title key="anemoiTitle">
          Anemoi
        </Title>
      }
    </PoseGroup>
  )
}

export default AnemoiTitle;
