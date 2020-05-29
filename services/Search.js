export { query, handleError }

function query(sort, page, size) {
  const es_syntax = {
    size: size,
    sort: sort,
    from: size * (page - 1)
  }
  return {
    params: {
      source: JSON.stringify(es_syntax),
      source_content_type: 'application/json'
    }
  }
}

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
