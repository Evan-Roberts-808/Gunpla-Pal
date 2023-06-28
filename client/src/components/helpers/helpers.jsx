export async function getCurrentUser() {
    return fetch(`/api/check_session`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch(error => setErrors(error));
  }