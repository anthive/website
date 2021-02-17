const Truncate = {
  methods: {
    getStringTruncated(string, size) {
      const truncatedString = string.length > size ? `${string.substr(0, size - 1)}...` : string
      return truncatedString
    },
    getNumberTruncated(number) {
      if (number >= 1000) {
        number = `${Math.floor(number / 1000)}K`
      }

      if (number >= 1000000) {
        number = `${Math.floor(number / 1000000)}M`
      }

      return number
    }
  }
}
export default Truncate
