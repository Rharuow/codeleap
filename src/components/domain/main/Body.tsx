import React, { useEffect, useState } from 'react'
import NewPost from './post/New'

import { api } from '../../../../service/api'
import { useUsername } from '../../../context/username'
import Post from './post/Post'

interface IPost {
    id: number,
    username: string,
    created_datetime: Date,
    title: string,
    content: string
}

const Body: React.FC<{posts: Array<IPost>, setPosts: React.Dispatch<React.SetStateAction<never[]>>}> = ({posts, setPosts}) => {

    const { username } = useUsername()

    useEffect(() => {
        api.get("/").then(res => {
            setPosts(res.data.results)
        })
    }, [])

    return (
        <div className="w-100 px-39px py-23px">
            <NewPost username={username} setPosts={setPosts} />
            {
                posts.map((post, index) => <Post key={index} post={post} setPosts={setPosts} />)
            }
        </div>
    )
}

export default Body
