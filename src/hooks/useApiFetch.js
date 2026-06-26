export default function useApiFetch() {
  return async (url, options = {}) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    const response = await fetch(url, {
      ...options,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })

    if (response.status === 401) {
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      window.location.replace('/home')
      return null
    }

    if (response.status === 404) {
      window.location.replace('/home')
      return null
    }

    return response
  }
}
