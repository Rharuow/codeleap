import { useSession } from 'next-auth/client'
import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect
} from 'react'
import Loading from '../components/Loading'

interface IUsernameContext {
  username: string
  setUsername: Dispatch<SetStateAction<string>>
  setLoading: Dispatch<SetStateAction<boolean>>
  loading: boolean
}

const UsernameContext = createContext({} as IUsernameContext)

const UsernameProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)

  const timeToLoading = process.env.NODE_ENV === 'production' ? 3000 : 1000

  const [session, status] = useSession()

  useEffect(() => {
    session && session.user && setUsername(`${session.user.name}`)
  }, [session])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, timeToLoading)
  }, [])

  return (
    <UsernameContext.Provider
      value={{ username, setUsername, setLoading, loading }}
    >
      {loading ? <Loading /> : children}
    </UsernameContext.Provider>
  )
}

export function useUsername() {
  const { username, setUsername, loading, setLoading } =
    useContext(UsernameContext)

  return { username, setUsername, loading, setLoading }
}

export default UsernameProvider
