import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { getCsrfToken } from "next-auth/client";
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from 'react-bootstrap'
import * as yup from 'yup'
import { useRouter } from 'next/router'

import { useUsername } from '../context/username'
import Loading from '../components/Loading'

import { nextAuth } from '../../service/api'

const schema = yup.object().shape({
  username: yup.string().required('username is required')
})

interface IFormInput {
  username: string
}

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState(true)
  const { username, setUsername } = useUsername()

  const router = useRouter()

  const { handleSubmit, register } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    const csrfToken = await getCsrfToken();

    setUsername(data.username)
    nextAuth.post("api/auth/callback/domain-username", {
      ...data,
      csrfToken,
      callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/main`,
    })
    .then((response) => {
      setLoading(false);
      router.push("/main");
    })
    .catch((error) => {
      router.push("/main")
    });
  }

  useEffect(() => {
    schema.isValid({ username }).then(valid => {
      if (valid) {
        setError('')
        setDisabled(false)
      } else setDisabled(true)
    })

    schema.validate({ username }).catch(err => {
      setError(err.errors)
    })
  }, [username])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-secondary vh-100 w-100 d-flex justify-content-center align-items-center">
          <div className="card px-32px py-28px rounded-0 w-500px border">
            <div className="card-body">
              <h1 className="fs-22px fw-700 mb-30px">
                Welcome to CodeLeap network!
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="username" className="fs-1rem mb-13px">
                    Please enter your username
                  </label>
                  <input
                    type="text"
                    {...register('username')}
                    onChange={e => {
                      setUsername(e.target.value)
                    }}
                    className="form-control form-control-sm"
                    id="username"
                    name="username"
                    aria-describedby="Username"
                    placeholder="John doe"
                  />
                  {error && error != '' && (
                    <small
                      id="errorUsername"
                      className="form-text text-muted mt-5px"
                    >
                      {error}
                    </small>
                  )}
                  <div className="w-100 d-flex justify-content-end">
                    <Button
                      variant="primary"
                      disabled={disabled}
                      type="submit"
                      className="rounded-0 btn-sm fw-700 fs-1rem px-30px py-7px mt-20px"
                    >
                      ENTER
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Home
