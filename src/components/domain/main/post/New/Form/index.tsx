import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { SubmitHandler, useFormContext, useWatch } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'
import { api } from '../../../../../../../service/api'
import Swal from 'sweetalert2'
import { useSession } from 'next-auth/client'
import { useUsername } from '../../../../../../context/username'

export interface INewPostFormInput {
  title: string
  content: string
}

const NewPostForm: React.FC<{
  setPosts: React.Dispatch<React.SetStateAction<never[]>>
}> = ({ setPosts }) => {
  const { handleSubmit, register, control } = useFormContext()

  const titleWatch = useWatch({ name: 'title', control })

  const contentWatch = useWatch({ name: 'content', control })

  const disabled =
    !titleWatch ||
    titleWatch.length <= 0 ||
    !contentWatch ||
    contentWatch.length <= 0

  const MySwal = withReactContent(Swal)

  const { username } = useUsername()

  const onSubmit: SubmitHandler<INewPostFormInput> = ({ title, content }) => {
    api
      .post('/', {
        username,
        title,
        content
      })
      .then(res => {
        MySwal.fire({
          icon: 'success',
          title: 'GREAT!',
          text: 'Your post are created successfully'
        }).then(() => {
          api.get('/').then(res => {
            setPosts(res.data.results)
          })
        })
      })
      .catch(err => {
        MySwal.fire({
          icon: 'error',
          title: 'Sorry!',
          text: "Your post aren't created"
        })
      })
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-19px">
        <label htmlFor="title" className="fs-1rem mb-7px">
          Title
        </label>
        <input
          type="text"
          {...register('title')}
          className="form-control form-control-sm"
          id="title"
          name="title"
          aria-describedby="title"
          placeholder="Hello world"
        />
      </div>
      <div className="form-group">
        <label htmlFor="content" className="fs-1rem mb-7px">
          Content
        </label>
        <textarea
          {...register('content')}
          className="form-control"
          id="content"
          name="content"
          rows={3}
          placeholder="Content here"
          style={{ resize: 'none' }}
        />
      </div>
      <div className="w-100 d-flex justify-content-end">
        <Button
          variant="primary"
          disabled={disabled}
          type="submit"
          className="rounded-0 btn-sm fw-700 fs-1rem px-30px py-7px mt-20px"
        >
          CREATE
        </Button>
      </div>
    </Form>
  )
}

export default NewPostForm
