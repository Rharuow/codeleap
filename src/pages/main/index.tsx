import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import Header from '../../components/domain/main/Header'
import Body from '../../components/domain/main/Body'

import { api } from '../../../service/api'
import Loading from '../../components/Loading'
import { useUsername } from '../../context/username'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

const MainPage: React.FC = () => {
  const { loading } = useUsername()

  const [session] = useSession()

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
