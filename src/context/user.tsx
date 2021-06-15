import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getToken, setToken } from '../lib/auth'
import { MeQuery, useMeLazyQuery, User } from '../generated/graphql';
import * as ROUTES from '../lib/routes'
import firebase from 'firebase';

interface UserContextProps {
  loading: boolean,
  isAuthenticated: boolean
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  logout: () => void
}

const initialState: UserContextProps = {
  isAuthenticated: false,
  loading: false,
  user: null,
  setUser: () => {},
  logout: () => {},
}

export const UserContext = React.createContext<UserContextProps>(initialState)

const UserContextComp: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setAuthenticated] = useState(false)
  const router = useRouter()
  const [getAuthUser, { data, loading, client }] = useMeLazyQuery({
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // @ts-expect-error
      setUser(data?.me)
      setAuthenticated(true)
    }
  })

  useEffect(() => {
    try {
      const unsubscriber = firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          setToken(await user.getIdToken())
          getAuthUser()
          console.log('fetching user')
          client?.resetStore()
        } else setUser(null)
      })
      return () => unsubscriber()
    } catch (err) {
      console.log(err)
    }
  }, [])

  const logout = () => {
    firebase.auth().signOut()
    client?.resetStore()
    router.push(ROUTES.LANDING)
  }

  return (
    <UserContext.Provider value={{
      isAuthenticated,
      loading,
      user,
      setUser,
      logout,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextComp
