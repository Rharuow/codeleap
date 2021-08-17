import React, { useEffect, useState  } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from 'react-bootstrap'

import codeleapLogo from "../assets/images/codeleap_logo_black 1.svg"


interface IFormInput {
  username: string
}

const Home: NextPage = () => {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const { handleSubmit, register } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <>
      {
        loading ?
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Image width={607.5} height={167} className="pulse" layout="fixed" src={codeleapLogo} alt="main logo codeleap" />
          </div>
          :
          <div className="bg-secondary vh-100 w-100 d-flex justify-content-center align-items-center">
            <div className="card px-32px py-28px rounded-0 w-500px border">
              <div className="card-body">
                <h1 className="fs-22px fw-700 mb-30px">Welcome to CodeLeap network!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label htmlFor="username" className="fs-1rem mb-13px">Please enter your username</label>
                    <input type="email" className="form-control form-control-sm" id="username" {...register("username")} aria-describedby="emailHelp" placeholder="John doe"/>
                    {
                      error && error != "" && <small id="emailHelp" className="form-text text-muted">{error}</small>
                    }
                    <div className="w-100 d-flex justify-content-end">
                      <Button variant="primary" className="rounded-0 btn-sm fw-700 fs-1rem px-30px py-7px mt-20px">ENTER</Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Home
