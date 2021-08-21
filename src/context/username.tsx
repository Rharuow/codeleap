import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction
} from 'react'

interface IUsernameContext {
  username: string
  setUsername: Dispatch<SetStateAction<string>>
}

const UsernameContext = createContext({} as IUsernameContext)

const UsernameProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState('')

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  )
}

export function useUsername() {
  const { username, setUsername } = useContext(UsernameContext)

  return { username, setUsername }
}

export default UsernameProvider
