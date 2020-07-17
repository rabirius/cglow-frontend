import axios from 'axios'
export const userService = {
  login,
  logout,
  gitlogin
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
    const error = err.response.data
    return Promise.reject(error)
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
    const error = err.response.data
    return Promise.reject(error)
  }
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}
