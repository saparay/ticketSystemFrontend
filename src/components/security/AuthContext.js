import React, { useContext, useEffect, useState } from 'react'
import { createContext } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { apiClient, executeJwtAuthenticationService } from '../api/AuthenticationApiService';


export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)


export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  useEffect(() => check(), [])
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(null);
  const [role, setRole] = useState('');
  // const AutoLogOut = () => {
  //   setTimeout(() => {
  //     logout()
  //     console.log("Time Out");
  //   }, 60000)
  // }
  async function login(usernameOrEmail, password) {

    try {
      const response = await executeJwtAuthenticationService(usernameOrEmail, password)
      setToken(response)
      localStorage.setItem('response', JSON.stringify(response))
      // console.log(response)
      if (response.status === 200) {
        setUsername(usernameOrEmail)
        localStorage.setItem('user', usernameOrEmail)
        //localStorage.setItem('user', usernameOrEmail)
        const jwtToken = 'Bearer ' + response.data.accessToken
        localStorage.setItem('token', jwtToken)
        //localStorage.setItem('token', jwtToken)
        // console.log(jwtToken)
        setAuthenticated(true)

        localStorage.setItem('role', (response.data.role))
        //localStorage.setItem('role', (response.data.role))
        setRole(JSON.stringify(localStorage.getItem('role')))

        setToken(jwtToken)
        
        check()
        //AutoLogOut()
        return true
      } else {
        logout()
        return false
      }
    } catch (error) {
      logout()
      return false
    }

  }
  function check() {
    //JSON.parse(localStorage.getItem('response')).status===200
    if (localStorage.getItem('response') != null) {

      setAuthenticated(true)
      setRole(localStorage.getItem('role'))
      setUsername(localStorage.getItem('user'))
      apiClient.interceptors.request.use(
        (config) => {
          console.log('Intercepting and adding a token')
          config.headers.Authorization = localStorage.getItem('token')

          return config
        }
      )
    }
  }
  function role_admin() {
    if (role === '[ROLE_ADMIN]') {
      return true
    }
  }
  function role_lead() {
    if (role === '[ROLE_LEAD]') {
      return true
    }
  }
  function role_member() {
    if (role === '[ROLE_MEMBER]') {
      return true
    }
  }

  function logout() {
    setAuthenticated(false)
    localStorage.removeItem('response')
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
    setToken(null)
    
    navigate('/')
    window.location.reload(true)
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, role_admin, role_lead, role_member, check, username }}>
      {children}
    </AuthContext.Provider>
  )
}


