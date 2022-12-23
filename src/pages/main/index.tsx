import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import Header from '../../components/domain/main/Header'
import Body from '../../components/domain/main/Body'

import Loading from '../../components/Loading'
import { useUsername } from '../../context/username'

const MainPage: React.FC = () => {
  const { loading } = useUsername()

  return (
    <div className="w-100">
      {loading ? (
        <Loading />
      ) : (
        <Container className="bg-white p-0">
          <Row className="mb-45px">
            <Col>
              <Header />
            </Col>
          </Row>
          <Row>
            <Col>
              <Body />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default MainPage
