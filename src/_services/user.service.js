import axios from 'axios'
export const userService = {
  login,
  register,
  logout,
  gitlogin,
  refresh
}
const endpoint = 'http://192.168.0.2:8000/'
async function login(username, password) {
  var data = JSON.stringify({ username, password })
  var config = {
    method: 'post',
    url: endpoint + 'auth/token',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }
  try {
    const response = await axios(config)
    if (response.data.refresh && response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  } catch (err) {
    if (!err.response) {
      return Promise.reject(err)
    } else {
      return Promise.reject(err.response.data)
    }
  }
}

async function refresh() {
  var token = JSON.parse(localStorage.getItem('user'))
  token = token.refresh
  var config = {
    method: 'get',
    url: endpoint + 'auth/refresh',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  }
  try {
    const response = await axios(config)
    if (response.data.refresh && response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data))
      return response.data.token
    } else {
      return Promise.reject('Token Verification error')
    }
  } catch (err) {
    console.log(err.response)
    return Promise.reject(err)
  }
}

async function register(username, email, password) {
  var data = JSON.stringify({ username, email, password })
  var config = {
    method: 'post',
    url: endpoint + 'auth/register',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }
  try {
    const response = await axios(config)
    if (response.data.refresh && response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  } catch (err) {
    if (!err.response) {
      return Promise.reject(err)
    } else {
      return Promise.reject(err.response.data)
    }
  }
}

async function gitlogin(code) {
  var data = JSON.stringify({ code })
  var config = {
    method: 'post',
    url: endpoint + 'auth/github',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }
  try {
    const response = await axios(config)
    if (response.data.refresh && response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  } catch (err) {
    if (!err.response) {
      return Promise.reject(err)
    } else {
      return Promise.reject(err.response.data)
    }
  }
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}
