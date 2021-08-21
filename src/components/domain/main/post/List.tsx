import React, { useEffect, useState } from 'react'
import api from '../../../../service/api'

const List = () => {

    const [posts, setPosts] = useState()

    useEffect(() => {
        api.get("/").then(res => {
            setPosts(res.data.results)
        })
    }, [])

    return (
        <div className="w-100 border border-color-secondary py-29px px-34px mt-29px">
            <h2></h2>
        </div>
    )
}

export default List
