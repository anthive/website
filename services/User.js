import axios from "axios";

const baseURL = "https://anthive.io/";
const githubURL = "https://api.github.com/";

class User {
  constructor() {
    this.Username = ''
    this.Lang = ''
    this.Version = ''
    this.Games = ''
    this.Wealth = ''
    this.Wg = ''
    // this.Span = ''
    // this.Picture = ''
    // this.FC = ''
    // this.Skin = ''
    // this.X = ''
    // this.Y = ''
    // this.Stats = ''
  }

  async initUser(user) {
    console.log('init user', user)
    this.Username = user.Username
    this.Lang = user.Lang
    this.Version = user.Version
    this.Games = user.Games
    this.Wealth = user.Wealth
    this.Wg = user.Wg
    // this.Span = user.Span
    // this.Picture = user.Picture
    // this.FC = user.FC
    // this.Skin = user.Skin
    // this.X = user.X
    // this.Y = user.Y
    // this.Stats = user.Stats
  }

  async getUserdata(username) {
    this.Username = username
    if (this.Username === '' || this.Username === undefined) return

    var ghAxios = axios.create({
      baseURL: githubURL,
      timeout: 30000
    });

    return ghAxios.get('users/' + this.Username)
      .then((res) => {
        var user = res.data;
        return {
          name: (user.name != null) ? user.name : this.Username,
          avatar: this.photoUrl(250),
          company: user.company,
          location: user.location,
          blog: (user.blog != '') ? user.blog : null
        };
      }).catch(handleError);
  }

  photoUrl(size = 70) {
    if (this.Username.startsWith('sample-')) {
      return this.langUrl(this.Username.substring(7));
    }
    return "https://github.com/" + this.Username + ".png?size=" + size;
  }

  langUrl(lang = this.Lang) {
    return baseURL + "skins/lang/" + lang + ".png";
  }

  antUrl(skin, big = false) {
    if (big) {
      return baseURL + "skins/client/" + skin + "/antBig.png";
    }
    return baseURL + "skins/client/" + skin + "/ant.png";
  }

  hiveUrl(skin, big = false) {
    if (big) {
      return baseURL + "skins/client/" + skin + "/hiveBig.png";
    }
    return baseURL + "skins/client/" + skin + "/hive.png";
  }

  scoreString() {
    var suffixes = ["", "K", "M", "B", "t"];
    var suffixNum = Math.floor((("" + this.Wealth).length - 1) / 3);
    //console.log(value, suffixNum);
    var shortValue = parseFloat((suffixNum != 0 ? (this.Wealth / Math.pow(1000, suffixNum)) : this.Wealth).toPrecision(2));
    return shortValue + suffixes[suffixNum];
  }
}

function timeAgo(epochStamp) {
  const diff = Math.round(new Date()) - epochStamp;
  const periods = {
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };
  if (diff > periods.month) {
    // it was at least a month ago
    return Math.floor(diff / periods.month) + "m ago";
  } else if (diff > periods.week) {
    return Math.floor(diff / periods.week) + "w ago";
  } else if (diff > periods.day) {
    return Math.floor(diff / periods.day) + "d ago";
  } else if (diff > periods.hour) {
    return Math.floor(diff / periods.hour) + "h ago";
  } else if (diff > periods.minute) {
    return Math.floor(diff / periods.minute) + "m ago";
  } else if (diff > periods.second) {
    return Math.floor(diff / periods.second) + "s ago";
  }
  return "Just now";
}


function handleError(error) {
  if (error.response) {
    console.log(error.response.data);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
  console.log(error.config.url);
  console.log(error.config.params);
}
export {
  User,
  timeAgo
}