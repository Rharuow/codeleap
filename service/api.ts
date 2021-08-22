import axios from "axios"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

const nextAuth = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  });

export { api, nextAuth }