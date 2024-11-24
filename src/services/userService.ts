import api from '@/services/api'

export default function userService() {
  const getUsers = async () => {
    const response = await api.get('/users')

    if (response.status != 200) return {
      status: 'ERROR',
      message: 'Can not fetch user list.',
      errors: {
        global: 'Not found.'
      },
      data: [],
    }

    return {
      status: 'SUCCESS',
      message: 'Fetch user list successfully.',
      data: response.data,
    }
  }

  const getUser = async (id: number) => {
    const response = await api.get(`/users/${id}`)

    if (response.status != 200) return {
      status: 'ERROR',
      message: 'Can not fetch user list.',
      errors: {
        global: 'Not found.'
      },
      data: null,
    }

    return {
      status: 'SUCCESS',
      message: 'Fetch user list successfully.',
      data: response.data,
    }
  }

  return {
    getUsers,
    getUser,
  }
}
