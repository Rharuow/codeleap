import React from 'react'
import type { NextPage } from 'next'

import Loading from '../components/Loading'

import SignIn from '../components/domain/SignIn'
import { useUsername } from '../context/username'

const Home: NextPage = () => {
  const { loading } = useUsername()

  return <>{loading ? <Loading /> : <SignIn />}</>
}

export default Home
