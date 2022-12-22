import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import * as yup from 'yup'

import Loading from '../components/Loading'

import SignIn from '../components/domain/SignIn'

const schema = yup.object().shape({
  username: yup.string().required('username is required')
})

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return <>{loading ? <Loading /> : <SignIn />}</>
}

export default Home
