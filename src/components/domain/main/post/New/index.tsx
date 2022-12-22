import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import NewPostForm from './Form'

const NewPost: React.FC<{
  setPosts: React.Dispatch<React.SetStateAction<never[]>>
}> = ({ setPosts }) => {
  const methods = useForm()

  return (
    <div className="w-100 border border-color-secondary py-29px px-34px">
      <h2 className="fw-700 fs-22px mb-34px">What's on your mind?</h2>
      <FormProvider {...methods}>
        <NewPostForm setPosts={setPosts} />
      </FormProvider>
    </div>
  )
}

export default NewPost
