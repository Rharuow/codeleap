import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { getCsrfToken } from 'next-auth/client'

import Fields from './Fields'
import { nextAuth } from '../../../../../service/api'
import { useRouter } from 'next/router'

export interface ISignInFormInput {
  username: string
}

const Form = () => {
  const methods = useForm<ISignInFormInput>()

  const router = useRouter()

  const onSubmit: SubmitHandler<ISignInFormInput> = async data => {
    const csrfToken = await getCsrfToken()

    nextAuth
      .post('api/auth/callback/domain-username', {
        ...data,
        csrfToken,
        callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/main`
      })
      .then(response => {
        router.push('/main')
      })
      .catch(error => {
        console.log('error = ', error)
        // router.push('/main')
      })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Fields />
      </form>
    </FormProvider>
  )
}

export default Form
