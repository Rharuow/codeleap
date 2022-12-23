import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { getCsrfToken } from 'next-auth/client'

import Fields from './Fields'
import { useUsername } from '../../../../context/username'
import { useRouter } from 'next/router'
import { nextAuth } from '../../../../../service/api'

export interface ISignInFormInput {
  username: string
}

const Form = () => {
  const methods = useForm<ISignInFormInput>()

  const router = useRouter()

  const { setUsername } = useUsername()

  const onSubmit: SubmitHandler<ISignInFormInput> = async data => {
    const csrfToken = await getCsrfToken()

    nextAuth
      .post('api/auth/callback/domain-username', {
        ...data,
        csrfToken,
        callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/main`
      })
      .then(response => {
        setUsername(data.username)
        router.push('/main')
      })
      .catch(error => {
        console.log(error)
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
