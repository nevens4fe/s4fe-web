import Axios from 'axios'

const authAxios = Axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8001/'
    : 'https://s4fe.herokuapp.com/'
})

const endpoints = {
  PASSWORD_RESET: 'rest-auth/password/reset/',
  PASSWORD_CAHNGE: 'rest-auth/password/change/',
  SOCIAL_LOGIN: (network) => `rest-auth/${network}/`,
  USER: 'rest-auth/user/',
  REGISTER: 'rest-auth/registration/',
  LOGIN: 'rest-auth/login/'
}

export function SocialLogin (network, data) {
  return authAxios.post(endpoints.SOCIAL_LOGIN(network), data)
}

export function Login (data) {
  return authAxios.post(endpoints.LOGIN, data)
}

export function UpdateUser (data, token) {
  return authAxios.patch(endpoints.USER, data, {
    headers: {
      Authorization: 'Token ' + token
    }
  })
}

export function ChangePassword (data, token) {
  return authAxios.post(endpoints.PASSWORD_CAHNGE, data, {
    headers: {
      Authorization: 'Token ' + token
    }
  })
}

export function Register (data) {
  return authAxios.post(endpoints.REGISTER, data)
}

export function ResetPassword (data) {
  return authAxios.post(endpoints.PASSWORD_RESET, data)
}
