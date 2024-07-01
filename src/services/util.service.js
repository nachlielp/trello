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
  createNewTask,
  createNewGroup,
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
      return { bgColor: "#f5cd47", color: "dark" };
    case "green":
      return { bgColor: "#4cce97", color: "dark" };
    case "purple":
      return { bgColor: "#9f8fef", color: "dark" };
    case "orange":
      return { bgColor: "#fea362", color: "dark" };
    case "red":
      return { bgColor: "#f87169", color: "dark" };
    case "blue":
      return { bgColor: "#569dff", color: "dark" };
    case "sky":
      return { bgColor: "#6cc3e0", color: "dark" };
    case "lime":
      return { bgColor: "#94c748", color: "dark" };
    case "pink":
      return { bgColor: "#e774bb", color: "dark" };
    case "black":
      return { bgColor: "#8590a2", color: "dark" };
    default:
      return { bgColor: "#fff", color: "dark" };
  }
}

function _createStartInfo() {
  if(import.meta.env.VITE_TRELLO_DARKMODE){

    localStorage.setItem("dark", import.meta.env.VITE_TRELLO_DARKMODE)
  }


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

function createNewTask(task) {
  return {
    id: utilService.makeId(),
    badges: {
      attachmentsByType: {
        trello: {
          board: 0,
          card: 0,
        },
      },
      externalSource: null,
      location: false,
      votes: 0,
      viewingMemberVoted: false,
      subscribed: false,
      attachments: 0,
      fogbugz: "",
      checkItems: 0,
      checkItemsChecked: 0,
      checkItemsEarliestDue: null,
      comments: 0,
      description: false,
      due: null,
      dueComplete: false,
      lastUpdatedByAi: false,
      start: null,
    },
    checkItemStates: [],
    closed: false,
    dueComplete: false,
    dateLastActivity: new Date().toISOString(),
    desc: "",
    descData: {
      emoji: {},
    },
    due: null,
    dueReminder: null,
    email: null,
    idBoard: task.idBoard,
    idChecklists: [],
    idGroup: task.groupId,
    idMembers: [],
    idMembersVoted: [],
    idShort: "", // generateShortId(), // Function to generate a short ID
    idAttachmentCover: null,
    labels: [],
    idLabels: [],
    manualCoverAttachment: true,
    name: task.name,
    pos: task.pos, // Default position, can be adjusted
    shortLink: "", // generateShortLink(), // Function to generate a short link
    shortUrl: "", // `https://trello.com/c/${generateShortLink()}`,
    start: null,
    subscribed: false,
    url: "", // `https://trello.com/c/${generateShortLink()}`,
    cover: {
      idAttachment: null,
      color: null,
      idUploadedBackground: null,
      size: "",
      brightness: "",
      scaled: [],
      edgeColor: "",
      sharedSourceUrl: null,
      idPlugin: null,
    },
    isTemplate: false,
    cardRole: null,
  };
}

function createNewGroup(group) {
  return {
    id: utilService.makeId(),
    idBoard: group.idBoard,
    name: group.name,
    closed: false,
    color: null,
    subscribed: false,
    softLimit: null,
    pos: group.pos,
  };
}