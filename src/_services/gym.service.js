import { userService } from './user.service'
import axios from 'axios'
import store from '../store'
export const gymService = {
  list,
  details,
  updateProblem,
  createNew
}

const endpoint = 'http://192.168.0.2:8000/'

async function list() {
  var userToken
  try {
    const token = await userService.refresh()
    userToken = token
  } catch (error) {
    if (!error.response) {
      return Promise.reject(error)
    } else {
      if (error.response.status === 401) {
        store.dispatch('authentication/logout')
      }
      return Promise.reject(error.response.data)
    }
  }

  var config = {
    method: 'get',
    url: endpoint + 'gym/problems',
    headers: {
      Authorization: userToken
    }
  }
  try {
    const response = await axios(config)
    return Promise.resolve(response.data)
  } catch (err) {
    if (!err.response) {
      return Promise.reject(err)
    } else {
      return Promise.reject(err.response.data)
    }
  }
}

async function updateProblem(problem) {
  var userToken
  try {
    const token = await userService.refresh()
    userToken = token
  } catch (error) {
    return Promise.reject(error)
  }

  var data = JSON.stringify(problem)
  var config = {
    method: 'post',
    url: endpoint + 'gym/updateproblem',
    headers: {
      Authorization: userToken,
      'Content-Type': 'application/json'
    },
    data: data
  }
  try {
    const response = await axios(config)
    return Promise.resolve(response.data)
  } catch (err) {
    if (!err.response) {
      return Promise.reject(err)
    } else {
      return Promise.reject(err.response.data)
    }
  }
}

async function details(ID) {
  var userToken
  try {
    const token = await userService.refresh()
    userToken = token
  } catch (error) {
    return Promise.reject(error)
  }

  var config = {
    method: 'get',
    url: endpoint + 'gym/details?id=' + ID,
    headers: {
      Authorization: userToken
    }
  }
  try {
    const response = await axios(config)
    return Promise.resolve(response.data)
  } catch (err) {
    if (!err.response) {
      return Promise.reject(err)
    } else {
      return Promise.reject(err.response.data)
    }
  }
}
async function createNew(Title) {
  var userToken
  try {
    const token = await userService.refresh()
    userToken = token
  } catch (error) {
    return Promise.reject(error)
  }
  var config = {
    method: 'get',
    url: endpoint + 'gym/createproblem?title=' + Title,
    headers: {
      Authorization: userToken
    }
  }
  try {
    const response = await axios(config)
    return Promise.resolve(response.data)
  } catch (err) {
    if (!err.response) {
      return Promise.reject(err)
    } else {
      return Promise.reject(err.response.data)
    }
  }
}
