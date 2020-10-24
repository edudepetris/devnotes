const getNoteById = (id) => {
  const url = `/api/frontend/v1/notes/${id}`
  const init = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return fetch(url, init)
}

/* eslint-disable import/prefer-default-export */
export {getNoteById}
/* eslint-enable import/prefer-default-export */
