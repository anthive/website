export { handleError }

function handleError(error) {
  if (error.response) {
    console.log(error.response.data)
  } else if (error.request) {
    console.log(error.request)
  } else {
    console.log('Error', error.message)
  }
  console.log(error.config.url)
  console.log(error.config.params)
}
