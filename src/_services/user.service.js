import axios from 'axios'
export const userService = {
  login,
  logout
}
const endpoint = 'http://192.168.0.2:8000/'
function login(username, password) {
  var data = JSON.stringify({ username, password })
  var config = {
    method: 'post',
    url: endpoint + 'auth/token',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }
  return axios(config)
    .then(function(response) {
      if (response.data.refresh && response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data
    })
    .catch(function(err) {
      const error = err.response.data
      return Promise.reject(error)
    })
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}
