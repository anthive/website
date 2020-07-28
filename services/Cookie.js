class Cookie {
  static set(...values) {
    const cookieLifetime = new Date(Date.now() + 1000 * 60 * 60 * 24)
    const options = `; path=/; domain=localhost; expires=${cookieLifetime};`

    values.forEach(value => {
      document.cookie = value + ' ' + options
    })
  }

  static get(name) {
    let matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
  }

  static delete(...names) {
    names.forEach(name => {
      document.cookie = `${name}=''; max-age=-1;`
    })
  }
}

export default Cookie
