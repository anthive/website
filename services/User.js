export { getUserdata, photoUrl, langUrl,antUrl ,hiveUrl,scoreString,timeAgo}

import axios from "axios";

const baseURL = "https://anthive.io/";
const githubURL = "https://api.github.com/";

function getUserdata(username) {
  if (username === '' || username === undefined) return

  var ghAxios = axios.create({
    baseURL: githubURL,
    timeout: 30000
  });

  return ghAxios.get('users/' + username)
    .then((res) => {
      var user = res.data;

      return {
        name: (user.name != null) ? user.name : username,
        avatar: this.photoUrl(username, 250),
        company: user.company,
        location: user.location,
        blog: (user.blog != '') ? user.blog : null
      };
    }).catch(handleError);
}

function photoUrl(username, size) {
  if (username.startsWith('sample-')) {
    return langUrl(username.substring(7));
  }
  return "https://github.com/" + username + ".png?size=" + size;
}

function langUrl(lang) {
  return baseURL + "skins/lang/" + lang + ".png";
}

function antUrl(skin, big = false) {
  if (big) {
    return baseURL + "skins/client/" + skin + "/antBig.png";
  }
  return baseURL + "skins/client/" + skin + "/ant.png";
}

function hiveUrl(skin, big = false) {
  if (big) {
    return baseURL + "skins/client/" + skin + "/hiveBig.png";
  }
  return baseURL + "skins/client/" + skin + "/hive.png";
}

function scoreString(value) {
  var suffixes = ["", "K", "M", "B", "t"];
  var suffixNum = Math.floor((("" + value).length - 1) / 3);
  //console.log(value, suffixNum);
  var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(2));
  return shortValue + suffixes[suffixNum];
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

