export const register = newUser => {
    fetch("http://localhost:4000/user/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        })
      })
      .then(response => {
        console.log('Registered')
      })
  }
  
  export const login = user => {
    fetch("http://localhost:4000/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(response => {
        localStorage.setItem('usertoken', response.data)
        return response.data
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  export const getProfile = user => {
    return axios
      .get('users/profile', {
        //headers: { Authorization: ` ${this.getToken()}` }
      })
      .then(response => {
        console.log(response)
        return response.data
      })
      .catch(err => {
        console.log(err)
      })
  }