import { signOut, useSession } from 'next-auth/client'
import React, { useEffect } from 'react'
import Form from './Form'

const SignIn = () => {
  const [session] = useSession()

  console.log(session)

  return (
    <div className="bg-secondary vh-100 w-100 d-flex justify-content-center align-items-center">
      <div className="card px-32px py-28px rounded-0 w-500px border">
        <div className="card-body">
          <h1 className="fs-22px fw-700 mb-30px">
            Welcome to CodeLeap network!
          </h1>
          <Form />
        </div>
      </div>
    </div>
  )
}

export default SignIn
