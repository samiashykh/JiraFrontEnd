import isEmpty from 'lodash/isEmpty';
export function GitHubSignFunction() {
  window.location.href = 'http://127.0.0.1:3002/auth/github';
}

export async function GetAuthenication() {
  const urlParams = new URLSearchParams(window.location.search);
  let uid = urlParams.get('id')
  const response = await fetch('http://localhost:3002/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid })
  }).catch((response) => { console.log("Catch error : ", response.message) })
  let user = await response.json()
  if (!isEmpty(user)) {
    console.log("Verify token : ", user, "UID ", uid)
    sessionStorage.setItem('id', uid)
    sessionStorage.setItem('fullname', user.name)
    sessionStorage.setItem('email', user.email)
    sessionStorage.setItem('verificationToken', user.accessToken);
    console.log('Session : ',sessionStorage)
    return true
  }
  return false
}

export async function DashBoardData() {
  const response = await fetch(
    'http://localhost:3002/user/DashBoardData',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + sessionStorage.getItem('verificationToken'),
      },
      body: JSON.stringify({ id: sessionStorage.getItem('id') })
    }).catch((error) => console.log("Search error :", error.message))

  let searchresult = await response.json()
  return await searchresult
}
