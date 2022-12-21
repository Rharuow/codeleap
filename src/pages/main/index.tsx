import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import Header from '../../components/domain/main/Header'
import Body from '../../components/domain/main/Body'

import { api } from '../../../service/api'
import Loading from '../../components/Loading'

const index: React.FC = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/').then(res => {
      setPosts(res.data.results)
      setLoading(false)
    })
  }, [])
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
              <Body posts={posts} setPosts={setPosts} />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default index
