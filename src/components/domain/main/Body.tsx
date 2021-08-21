import React from 'react'
import NewPost from './post/New'

import api from '../../../service/api'
import { useUsername } from '../../../context/username'
import List from './post/List'


const Body = () => {

    const { username } = useUsername()

    return (
        <div className="w-100 px-39px py-23px">
            <NewPost username={username} />
            <List />
        </div>
    )
}

export default Body
