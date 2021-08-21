import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Body from '../../components/domain/main/Body'
import Header from '../../components/domain/main/Header'

const index: React.FC = () => {
    return (
        <div className="w-100 bg-secondary vh-100">
        <Container className="bg-white p-0">
            <Row className="mb-45px">
                <Col>
                    <Header/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Body/>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default index
