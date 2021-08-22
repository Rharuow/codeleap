import React, {useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from "yup"
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import { api } from "../../../../../service/api"

interface IFormInput {
    title: string
    content: string
}

const schema = yup.object().shape({
    content: yup.string().required('Content is required'),
    title: yup.string().required('Title is required'),
  })

const NewPost: React.FC<{
  username: string,
  title: string,
  content: string,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  setContent: React.Dispatch<React.SetStateAction<string>>,
  setPosts: React.Dispatch<React.SetStateAction<never[]>> 
}> = ({
  username,
  title,
  content,
  setTitle,
  setContent,
  setPosts
}) => {

  const [showError, setShowError] = useState<boolean>(false)
  const [error, setError] = useState({title: '', content: ''})
  const [disabled, setDisabled] = useState<boolean>()
  const MySwal = withReactContent(Swal);

  const {register, handleSubmit} = useForm()

  const onSubmit: SubmitHandler<IFormInput> = data => {
    api.post("/", {
      username,
      title,
      content
    }).then(res => {
      MySwal.fire({
        icon: "success",
        title: "GREAT!",
        text: "Your post are created successfully",
      }).then(() => {
        api.get("/").then(res => {
          setPosts(res.data.results)
        })
        setContent('')
        setTitle('')
      })
    }).catch(err => {
        MySwal.fire({
          icon: "error",
          title: "Sorry!",
          text: "Your post aren't created",
        })
    })
  }

    useEffect(() => {
      schema.isValid({ title, content }).then(valid => {
        if (valid) {
          setShowError(false)
          setDisabled(false)
        } else setDisabled(true)
      })
  
      schema.validate({ title, content }).catch(err => {
          setShowError(true)
          setError({
              title: err.errors[0].includes("Title") ? err.errors : '',
              content: err.errors[0].includes("Content") ? err.errors : ''
          })
      })
    }, [title, content])

    return (
        <div className="w-100 border border-color-secondary py-29px px-34px">
            <h2 className="fw-700 fs-22px mb-34px">What’s on your mind?</h2>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="title" className="fs-1rem mb-13px">
                    Title
                  </label>
                  <input
                    type="text"
                    {...register('title')}
                    onChange={e => {
                        setTitle(e.target.value)
                    }}
                    value={title}
                    className="form-control form-control-sm"
                    id="title"
                    name="title"
                    aria-describedby="title"
                    placeholder="Hello world"
                  />
                  {showError && error.title != '' && (
                    <small
                      id="errorTitle"
                      className="form-text  mt-5px text-danger"
                    >
                      {error.title}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="content" className="fs-1rem mb-13px">
                    Content
                  </label>
                  <textarea 
                  {...register('content')}
                    onChange={e => {
                        setContent(e.target.value)
                    }}
                    value={content} 
                    className="form-control" 
                    id="content" 
                    name="content" 
                    rows={3}
                    placeholder="Content here" 
                    style={{resize: 'none'}}/>
                  {showError && error.content != '' && (
                    <small
                      id="errorTitle"
                      className="form-text  mt-5px text-danger"
                    >
                      {error.content}
                    </small>
                  )}
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
        </div>
    )
}

export default NewPost
