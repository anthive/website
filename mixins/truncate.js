const Truncate = {
  methods: {
    getStringTruncated(string, size) {
      const truncatedString = string.length > size ? `${string.substr(0, size - 1)}...` : string
      return truncatedString
    },
    getNumberTruncatedToThousand(number) {
      const truncatedNumber = number > 1000 ? `${Math.floor(number / 1000)}K` : number
      return truncatedNumber
    }
  }
}
export default Truncate
