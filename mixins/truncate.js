const Truncate = {
  methods: {
    getStringTruncated(string, size) {
      const truncatedString = string.length > size ? `${string.substr(0, size - 1)}...` : string
      return truncatedString
    },
    getNumberTruncated(number) {
      let truncatedNumber
      switch (true) {
        case number >= 1000 && number < 1000000:
          truncatedNumber = `${Math.floor(number / 1000)}K`
          break

        case number >= 1000000:
          truncatedNumber = `${Math.floor(number / 1000000)}M`
          break

        default:
          truncatedNumber = number
          break
      }
      return truncatedNumber
    }
  }
}
export default Truncate
