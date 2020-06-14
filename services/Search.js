export { query, handleError }

function query(sort, page, size) {
  const es_syntax = {
    query: { match_all: {} },
    size: size,
    sort: sort,
    from: size * (page - 1)
  }
  return es_syntax
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
