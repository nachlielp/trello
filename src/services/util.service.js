import usersJson from "../../JSON/user.json";
import boardsJson from "../../JSON/board-info.json";
import membersJson from "../../JSON/board-members.json";

export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  debounce,
  randomPastTime,
  saveToStorage,
  loadFromStorage,
  getColorHashByName,
  capitalizeInitials,
  stringToColor,
  getRandomColor,
};
export const USERS_KEY = "users";
export const BOARDS_KEY = "boards";
export const LISTS_KEY = "lists";
export const CARDS_KEY = "cards";
export const MEMBERS_KEY = "members";

_createStartInfo();

function makeId(length = 6) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function makeLorem(size = 100) {
  var words = [
    "The sky",
    "above",
    "the port",
    "was",
    "the color of television",
    "tuned",
    "to",
    "a dead channel",
    ".",
    "All",
    "this happened",
    "more or less",
    ".",
    "I",
    "had",
    "the story",
    "bit by bit",
    "from various people",
    "and",
    "as generally",
    "happens",
    "in such cases",
    "each time",
    "it",
    "was",
    "a different story",
    ".",
    "It",
    "was",
    "a pleasure",
    "to",
    "burn",
  ];
  var txt = "";
  while (size > 0) {
    size--;
    txt += words[Math.floor(Math.random() * words.length)] + " ";
  }
  return txt;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function randomPastTime() {
  const HOUR = 1000 * 60 * 60;
  const DAY = 1000 * 60 * 60 * 24;
  const WEEK = 1000 * 60 * 60 * 24 * 7;

  const pastTime = getRandomIntInclusive(HOUR, WEEK);
  return Date.now() - pastTime;
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

function getColorHashByName(name) {
  switch (name) {
    case "yellow":
      return "#f5cd47";
    case "green":
      return "#4cce97";
    case "purple":
      return "#9f8fef";
    case "orange":
      return "#fea362";
    case "red":
      return "#f87169";
    case "blue":
      return "#569dff";
    case "sky":
      return "#6cc3e0";
    case "lime":
      return "#94c748";
    case "pink":
      return "#e774bb";
    case "black":
      return "#8590a2";
    default:
      return "#fff";
  }
}

function _createStartInfo() {
  // localStorage.setItem("dark", true)


  if (localStorage.getItem("dark") === "true") {
    document.querySelector('html').classList.add('dark');
  }



  //daily refresh
  if (+localStorage.getItem("date") !== new Date().getDate()) {
    localStorage.clear();
    localStorage.setItem("date", new Date().getDate());
  }

  //new states to start with
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(usersJson));
  }
  if (!localStorage.getItem(BOARDS_KEY)) {
    localStorage.setItem(BOARDS_KEY, JSON.stringify(boardsJson));
  }

  if (!localStorage.getItem(MEMBERS_KEY)) {
    localStorage.setItem(MEMBERS_KEY, JSON.stringify(membersJson));
  }

}

function getRandomColor(name) {
  let hash = 0;
  let i;
  for (i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function capitalizeInitials(string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

export function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}
