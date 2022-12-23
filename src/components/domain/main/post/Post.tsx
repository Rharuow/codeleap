import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Modal, Button, Form } from 'react-bootstrap'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { diffTime } from '../../../../assets/scripts/utils/diffTime'

import trash from '../../../../assets/images/trash.svg'
import edit from '../../../../assets/images/edit.svg'
import { api } from '../../../../../service/api'
import { useUsername } from '../../../../context/username'

export interface IPost {
  id: number
  username: string
  created_datetime: Date
  title: string
  content: string
}

export interface IFormInput {
  post_title: string
  post_content: string
}

const schema = yup.object().shape({
  content: yup.string().required('Content is required'),
  title: yup.string().required('Title is required')
})

const Post: React.FC<{
  post: IPost
  setPosts: React.Dispatch<React.SetStateAction<never[]>>
}> = ({ post, setPosts }) => {
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showError, setShowError] = useState<boolean>(false)
  const [title, setTitle] = useState<string>()
  const [content, setContent] = useState<string>()
  const [disabled, setDisabled] = useState<boolean>()
  const [error, setError] = useState({ title: '', content: '' })

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const MySwal = withReactContent(Swal)

  const deletePost = () => {
    api.delete(`/${post.id}/`).then(res => {
      MySwal.fire({
        icon: 'success',
        title: 'Post deleted',
        text: 'Your post was deleted with success'
      }).then(() => {
        api.get('/').then(res => {
          setPosts(res.data.results)
        })
        handleClose()
      })
    })
  }

  const Header = () => (
    <div className="bg-primary py-24px px-30px d-flex justify-content-between">
      <h2 className="text-white fs-22px fw-700 text-capitalize">
        {post.title}
      </h2>
      {post.username === username && (
        <div className="d-flex justify-content-end h-30px">
          <div className="me-30px ">
            <Image
              src={trash}
              className="mh"
              layout="fixed"
              width={17.5}
              height={22.5}
              onClick={() => {
                setShowEdit(false)
                setShowDelete(true)
                handleShow()
              }}
            />
          </div>
          <Image
            src={edit}
            layout="fixed"
            className="mh"
            onClick={() => {
              setShowEdit(true)
              setShowDelete(false)
              setTitle(post.title)
              setContent(post.content)
              handleShow()
            }}
            width={22.5}
            height={22.5}
          />
        </div>
      )}
    </div>
  )

  const Body = () => (
    <>
      <div className="px-30px pt-24px d-flex justify-content-between">
        <h3 className="fs-18px fw-700 text-gray">@{post.username}</h3>
        <span className="text-gray fs-18px fw-400">
          {diffTime(new Date(post.created_datetime), new Date())}
        </span>
      </div>
      <div className="px-30px pt-18px pb-24px d-flex justify-content-between">
        <p>{post.content}</p>
      </div>
    </>
  )

  const { username } = useUsername()

  const { handleSubmit } = useForm()

  const onSubmit: SubmitHandler<IFormInput> = data => {
    api
      .patch(`/${post.id}/`, {
        username,
        title,
        content
      })
      .then(res => {
        MySwal.fire({
          icon: 'success',
          title: 'GREAT!',
          text: 'Your post are edited with success'
        }).then(() => {
          api.get('/').then(res => {
            setPosts(res.data.results)
          })
          handleClose()
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
        title: err.errors[0].includes('Title') ? err.errors : '',
        content: err.errors[0].includes('Content') ? err.errors : ''
      })
    })
  }, [title, content])

  return (
    <div className="modal-90w border border-color-secondary mt-29px">
      <Modal show={show} onHide={handleClose} centered={!showDelete}>
        {showDelete ? (
          <Modal.Body className="pt-34px px-34px">
            Are you sure you want to delete this item?
            <div className="d-flex justify-content-end pb-26px px-34px pt-30px">
              <Button
                variant="outline-dark"
                className="me-20px rounded-0 w-111px"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="outline-dark"
                className="rounded-0 w-111px"
                onClick={() => deletePost()}
              >
                OK
              </Button>
            </div>
          </Modal.Body>
        ) : (
          <>
            <Modal.Header className="border-0 px-34px pt-34px fs-22px fw-700 w-100">
              Edit item
            </Modal.Header>
            <Modal.Body className=" px-34px">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="title" className="fs-1rem mb-7px">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => {
                      setTitle(e.target.value)
                    }}
                    className="form-control form-control-sm mb-19px"
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
                  <label htmlFor="content" className="fs-1rem mb-7px">
                    Content
                  </label>
                  <textarea
                    value={content}
                    onChange={e => {
                      setContent(e.target.value)
                    }}
                    className="form-control"
                    id="content"
                    name="content"
                    rows={3}
                    placeholder="Content here"
                    style={{ resize: 'none' }}
                  />
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
                    Save
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </>
        )}
      </Modal>
      <Header />
      <Body />
    </div>
  )
}

export default Post
