function getImageById(id, width = 100, height = width) {
  const imageHandler = process.env.API_URL + '/public/images'
  const imageUrl = `${imageHandler}/${id}/${width}/${height}`
  return imageUrl
}

export { getImageById }
