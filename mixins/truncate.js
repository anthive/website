const Truncate = {
  methods: {
    getStringTruncated(string, size) {
      const truncatedString = string.length > size ? `${string.substr(0, size - 1)}...` : string
      return truncatedString
    },
    getNumberTruncated(number) {
      if (number < 1000) {
        return number
      }
      if (number < 1000000) {
        return `${Math.floor(number / 10) / 100}K`
      }
      return `${Math.floor(number / 10000) / 100}M`
    }
  }
}
export default Truncate
