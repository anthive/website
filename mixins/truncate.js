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
        return `${Math.floor(number / 1000)}K`
      }
      return `${Math.floor(number / 1000000)}M`
    }
  }
}
export default Truncate
