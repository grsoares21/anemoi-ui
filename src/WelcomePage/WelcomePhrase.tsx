import React from 'react';

import './WelcomePhrase.scss';
import { Col, Row, Button } from 'react-bootstrap';

interface WelcomePhraseProps {
    collapse: Function
}
const WelcomePhrase: React.FC<WelcomePhraseProps> = (props: WelcomePhraseProps) => {
    return (
        <Col xs={{ span: 12, order: 2 }} md={{ span: 6, order: 1 }}>
            <Row className="h-100">
                <Col xs={{ span: 10, offset: 1 }} className="my-auto">
                    <div className="WelcomePhrase">
                        <h1 className="WelcomePhraseIntroduction">
                            Bem-vindo, eu sou o <em>Anemoi.</em>
                            <br />
                            Expert em <em>viagens.</em>
                            <br />
                        </h1>
                        <h1 className="WelcomePhraseCallToAction">
                            Possor ajudar a planejar a sua?
                    </h1>
                    </div>
                    <Button size="lg" variant="primary" onClick={() => props.collapse()}>
                        <b>Sim!</b>
                    </Button>
                </Col>
            </Row>
        </Col>
    );
}

export default WelcomePhrase;
