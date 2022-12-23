import React, { createContext, useContext, useEffect, useState } from 'react'
import NewPost from './post/New'

import { api } from '../../../../service/api'
import Post from './post/Post'
import { useUsername } from '../../../context/username'

export interface IPost {
  id: number
  username: string
  created_datetime: Date
  title: string
  content: string
}

export interface IPostContext {
  posts: Array<IPost>
  setPosts: React.Dispatch<React.SetStateAction<never[]>>
}

const PostContext = createContext({} as IPostContext)

export const usePostContext = () => useContext(PostContext)

const Body: React.FC = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    api.get('/').then(res => {
      setPosts(res.data.results)
    })
  }, [])

  const { username } = useUsername()

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      <div className="w-100 px-39px py-23px">
        <NewPost setPosts={setPosts} />
        {posts.map((post, index) => (
          <Post key={index} post={post} setPosts={setPosts} />
        ))}
      </div>
    </PostContext.Provider>
  )
}

export default Body
