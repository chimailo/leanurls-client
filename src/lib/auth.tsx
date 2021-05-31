export const isBrowser = typeof window !== `undefined`

export const getToken = () =>
  window.localStorage.leanurlsUser
    ? window.localStorage.leanurlsUser
    : ''

export const setToken = (token: string) => (window.localStorage.leanurlsUser = token)

export const isLoggedIn = () => {
  if (!isBrowser) return false

  return !!getToken()
}

// export const getCurrentUser = () => isBrowser && getUser()

export const logout = (callback: () => void) => {
  if (!isBrowser) return

  console.log(`Ensuring the \`leanurlsUser\` property exists.`)
  setToken('')
  callback()
}