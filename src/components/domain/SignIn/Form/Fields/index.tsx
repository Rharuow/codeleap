import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useFormContext, useWatch } from 'react-hook-form'

const Fields = () => {
  const [error, setError] = useState('')

  const { register, control } = useFormContext()

  const usernameWatch = useWatch({ name: 'username', control })

  return (
    <div className="form-group">
      <label htmlFor="username" className="fs-1rem mb-13px">
        Please enter your username
      </label>
      <input
        type="text"
        {...register('username')}
        className="form-control form-control-sm"
        aria-describedby="Username"
        placeholder="John doe"
      />
      {error && error != '' && (
        <small id="errorUsername" className="form-text text-muted mt-5px">
          {error}
        </small>
      )}
      <div className="w-100 d-flex justify-content-end">
        <Button
          variant="primary"
          disabled={!usernameWatch || usernameWatch.length <= 0}
          type="submit"
          className="rounded-0 btn-sm fw-700 fs-1rem px-30px py-7px mt-20px"
        >
          ENTER
        </Button>
      </div>
    </div>
  )
}

export default Fields
