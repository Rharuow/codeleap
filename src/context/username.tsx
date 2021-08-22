import { getSession } from 'next-auth/client'
import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'
import Loading from '../components/Loading'

interface IUsernameContext {
  username: string
  setUsername: Dispatch<SetStateAction<string>>
}

const UsernameContext = createContext({} as IUsernameContext)

const UsernameProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSession().then((session) => {
      setUsername(`${session?.name}`)
      setLoading(false)
    })
  }, [])

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {loading ? <Loading /> : children}
    </UsernameContext.Provider>
  )
}

export function useUsername() {
  const { username, setUsername } = useContext(UsernameContext)

  return { username, setUsername }
}

export default UsernameProvider
