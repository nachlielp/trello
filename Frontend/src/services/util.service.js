import usersJson from "../../JSON/user.json";
import boardsJson from "../../JSON/board-info.json";
import { attachment } from "@cloudinary/url-gen/qualifiers/flag";

const boardLabelColorOptions = [
  {
    color: "subtle green",
    bgColor: "#baf3db",
    hoverdBgColor: "#7ee2b8",
    darkFontColor: "#BAF3DB",
    lightFontColor: "#164B35",
  },
  {
    color: "subtle yellow",
    bgColor: "#f8e6a0",
    hoverdBgColor: "#F5CD47",
    darkFontColor: "#F8E6A0",
    lightFontColor: "#533F04",
  },
  {
    color: "subtle orange",
    bgColor: "#fedec8",
    hoverdBgColor: "#FEC195",
    darkFontColor: "#FEDEC8",
    lightFontColor: "#702E00",
  },
  {
    color: "subtle red",
    bgColor: "#ffd5d2",
    hoverdBgColor: "#FD9891",
    darkFontColor: "#FFD5D2",
    lightFontColor: "#5D1F1A",
  },
  {
    color: "subtle purple",
    bgColor: "#dfd8fd",
    hoverdBgColor: "#B8ACF6",
    darkFontColor: "#DFD8FD",
    lightFontColor: "#352C63",
  },

  {
    color: "green",
    bgColor: "#4bce97",
    hoverdBgColor: "#7EE2B8",
    isCover: true,
    darkFontColor: "#BAF3DB",
    lightFontColor: "#164B35",
    brightness: "light",
  },
  {
    color: "yellow",
    bgColor: "#f5cd47",
    hoverdBgColor: "#E2B203",
    isCover: true,
    darkFontColor: "#F8E6A0",
    lightFontColor: "#533F04",
    brightness: "light",
  },
  {
    color: "orange",
    bgColor: "#fea362",
    hoverdBgColor: "#FEC195",
    isCover: true,
    darkFontColor: "#FEDEC8",
    lightFontColor: "#702E00",
    brightness: "light",
  },
  {
    color: "red",
    bgColor: "#f87168",
    hoverdBgColor: "#FD9891",
    isCover: true,
    darkFontColor: "#FFD5D2",
    lightFontColor: "#5D1F1A",
    brightness: "light",
  },
  {
    color: "purple",
    bgColor: "#9f8fef",
    hoverdBgColor: "#B8ACF6",
    isCover: true,
    darkFontColor: "#DFD8FD",
    lightFontColor: "#352C63",
    brightness: "light",
  },

  {
    color: "bold green",
    bgColor: "#1f845a",
    hoverdBgColor: "#216E4E",
    darkFontColor: "#1D2125",
    lightFontColor: "#fff",
  },
  {
    color: "bold yellow",
    bgColor: "#946f01",
    hoverdBgColor: "#7F5F01",
    darkFontColor: "#1D2125",
    lightFontColor: "#fff",
  },
  {
    color: "bold orange",
    bgColor: "#c25100",
    hoverdBgColor: "#A54800",
    darkFontColor: "#1D2125",
    lightFontColor: "#fff",
  },
  {
    color: "bold red",
    bgColor: "#c9372c",
    hoverdBgColor: "#AE2E24",
    darkFontColor: "#1D2125",
    lightFontColor: "#fff",
  },
  {
    color: "bold purple",
    bgColor: "#6e5dc6",
    hoverdBgColor: "#5E4DB2",
    darkFontColor: "#1D2125",
    lightFontColor: "#fff",
  },

  //

  {
    color: "subtle blue",
    bgColor: "#cce0ff",
    hoverdBgColor: "#85B8FF",
    darkFontColor: "#CCE0FF",
    lightFontColor: "#09326C",
  },
  {
    color: "subtle sky",
    bgColor: "#c6edfb",
    hoverdBgColor: "#9DD9EE",
    darkFontColor: "#C6EDFB",
    lightFontColor: "#164555",
  },
  {
    color: "subtle lime",
    bgColor: "#d3f1a7",
    hoverdBgColor: "#B3DF72",
    darkFontColor: "#D3F1A7",
    lightFontColor: "#37471F",
  },
  {
    color: "subtle pink",
    bgColor: "#fdd0ec",
    hoverdBgColor: "#F797D2",
    darkFontColor: "#FDD0EC",
    lightFontColor: "#50253F",
  },
  {
    color: "subtle black",
    bgColor: "#dcdfe4",
    hoverdBgColor: "#B3B9C4",
    darkFontColor: "#DEE4EA",
    lightFontColor: "#091E42",
  },

  {
    color: "blue",
    bgColor: "#579dff",
    hoverdBgColor: "#85B8FF",
    isCover: true,
    darkFontColor: "#CCE0FF",
    lightFontColor: "#091E42",
    brightness: "light",
  },
  {
    color: "sky",
    bgColor: "#6cc3e0",
    hoverdBgColor: "#9DD9EE",
    isCover: true,
    darkFontColor: "#C6EDFB",
    lightFontColor: "#164555",
    brightness: "light",
  },
  {
    color: "lime",
    bgColor: "#94c748",
    hoverdBgColor: "#B3DF72",
    isCover: true,
    darkFontColor: "#D3F1A7",
    lightFontColor: "#37471F",
    brightness: "light",
  },
  {
    color: "pink",
    bgColor: "#e774bb",
    hoverdBgColor: "#F797D2",
    isCover: true,
    darkFontColor: "#FDD0EC",
    lightFontColor: "#50253F",
    brightness: "light",
  },
  {
    color: "black",
    bgColor: "#8590a2",
    hoverdBgColor: "#B3B9C4",
    isCover: true,
    darkFontColor: "#DEE4EA",
    lightFontColor: "#091E42",
    brightness: "light",
  },

  {
    color: "bold blue",
    bgColor: "#0c66e4",
    hoverdBgColor: "#0055CC",
    darkFontColor: "#1D2125",
    lightFontColor: "#fff",
  },
  {
    color: "bold sky",
    bgColor: "#227d9b",
    hoverdBgColor: "#206A83",
    darkFontColor: "#1D2125",
    lightFontColor: "#fff",
  },
  {
    color: "bold lime",
    bgColor: "#5b7f24",
    hoverdBgColor: "#4C6B1F",
    darkFontColor: "#1D2125",
    lightFontColor: "#fff",
  },
  {
    color: "bold pink",
    bgColor: "#ae4787",
    hoverdBgColor: "#943D73",
    darkFontColor: "#1D2125",
    lightFontColor: "#fff",
  },
  {
    color: "bold black",
    bgColor: "#626f86",
    hoverdBgColor: "#44546F",
    darkFontColor: "#1D2125",
    lightFontColor: "#fff",
  },

  //
  {
    color: "none",
    bgColor: "#091e420f",
    hoverdBgColor: "#091e4224",
    darkFontColor: "#B6C2CF",
    lightFontColor: "#172B4D",
  },
];

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
  boardLabelColorOptions,
  getBaseColors,
  createNewBoard,
  getBgImgs,
  getBgColors,
  createNewLabel,
  createCheckListItem,
  createCheckList,
  getEmojis,
  getChecklistBadge,
  createActivity,
  isValidUrl,
  measureExecutionTime,
  getAverageBorderColor,
  isColorDark,
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

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
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

function getColorHashByName(colorName) {
  const color = boardLabelColorOptions.find(
    (color) => color.color === colorName
  );
  return color;
}

function _createStartInfo() {
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
function createActivity(activity, user) {
  return {
    id: utilService.makeId(24),
    userFullName: user.fullName,
    userId: user.id,
    timeStamp: Date.now(),
    ...activity,
  };
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
    attachments: [],
    apdatedAt: new Date().toISOString(),
    members: [],
    checkLists: [],

    closed: false,
    dueComplete: false,
    dateLastActivity: new Date().toISOString(),
    desc: "",
    due: null,
    dueReminder: null,
    idBoard: task.idBoard,
    idGroup: task.groupId,
    idMembers: [],
    idLabels: [],
    name: task.name,
    pos: -1, // Default position, can be adjusted
    start: null,
    cover: {
      attachment: null,
      color: null,
      size: "normal",
      brightness: "light",
      edgeColor: "",
    },
    checkListTaskIds: [],
    activities: [],
  };
}

function createNewGroup(group) {
  return {
    id: utilService.makeId(),
    idBoard: group.idBoard,
    name: group.name,
    closed: false,
    color: null,
    pos: group.pos,
    tasks: [],
    updatedAt: null,
  };
}

function getChecklistBadge(task) {
  if (!task) return;

  const badges = {
    checkLists: {
      count: null,
      allChecked: false,
    },
  };

  if (task.checkLists) {
    const taskCheckedItemsCount = task.checkLists.reduce(
      (sum, obj) => sum + obj.checkItems.length,
      0
    );
    const totalCheckdItemsLength = task.checkLists.reduce((sum, obj) => {
      const localItemsCount = obj.checkItems.filter(
        (item) => item.isChecked === true
      ).length;
      return sum + localItemsCount;
    }, 0);
    if (taskCheckedItemsCount / totalCheckdItemsLength === 1) {
      badges.checkLists.allChecked = true;
    }
    if (taskCheckedItemsCount) {
      badges.checkLists.count = `${totalCheckdItemsLength} / ${taskCheckedItemsCount}`;
    }
  }

  return badges;
}

async function createNewBoard(board) {
  const user = await userService.getById(import.meta.env.VITE_TRELLO_USER_ID);
  const member = {
    id: user.id,
    permissionStatus: "admin",
  };
  return {
    prefs: {
      background: board.backgroundData.background,
      backgroundColor: board.backgroundData?.backgroundColor || null,
      backgroundImage: board.backgroundData?.backgroundImage || null,

      backgroundBrightness: board.backgroundData.backgroundBrightness,
      backgroundImageScaled:
        board.backgroundData?.backgroundImageScaled || null,
    },
    members: [member],
    checkListTaskIds: [],
    name: board.name,
    groups: [],
    labels: [
      {
        id: utilService.makeId(),
        color: "green",
        name: "",
      },
      {
        id: utilService.makeId(),
        color: "yellow",
        name: "",
      },
      {
        id: utilService.makeId(),
        color: "orange",
        name: "",
      },
      {
        id: utilService.makeId(),
        color: "red",
        name: "",
      },
      {
        id: utilService.makeId(),
        color: "purple",
        name: "",
      },
      {
        id: utilService.makeId(),
        color: "blue",
        name: "",
      },
    ],

    coverImgs: [
      {
        bg: "#f2a912",
        fontColor: "#fff",
        id: "kmeEGE",
        photographer: "Tomas Malik",
        scaledImgs: [
          {
            id: "6684dcb2ec30a8857a4446d6",
            scaled: true,
            url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/140x93/6d7f2d57ebfce6e57a63f9cacc470bb6/photo-1719329411191-be2cda36a37c.webp",
            bytes: 3766,
            height: 93,
            width: 140,
          },
          {
            id: "6684dcb2ec30a8857a4466d7",
            _id: "6684dcb2ec30a8857a4466d7",
            scaled: true,
            url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/256x171/6d7f2d57ebfce6e57a63f9cacc470bb6/photo-1719329411191-be2cda36a37c.webp",
            bytes: 8914,
            height: 171,
            width: 256,
          },
          {
            id: "6684dcb2ec30a8857a4466d8",
            _id: "6684dcb2ec30a8857a4466d8",
            scaled: true,
            url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/6d7f2d57ebfce6e57a63f9cacc470bb6/photo-1719329411191-be2cda36a37c.webp",
            bytes: 20338,
            height: 320,
            width: 480,
          },
        ],
        brightness: "light",
      },
      {
        bg: "#a4d4e4",
        fontColor: "#000",
        id: "LrFmk",
        photographer: "Furkan Elveren",
        scaledImgs: [
          {
            id: "6684dcc62182ea43e6103e60",
            _id: "6684dcc62182ea43e6103e60",
            scaled: true,
            url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/140x93/0f86a0bbb044d2bfc21f224456f2044a/photo-1719328555718-90eb4fac3e31.webp",
            bytes: 2470,
            height: 93,
            width: 140,
          },
          {
            id: "6684dcc62182ea43e6103e61",
            _id: "6684dcc62182ea43e6103e61",
            scaled: true,
            url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/256x171/0f86a0bbb044d2bfc21f224456f2044a/photo-1719328555718-90eb4fac3e31.webp",
            bytes: 6980,
            height: 171,
            width: 256,
          },
          {
            id: "6684dcc62182ea43e6103e62",
            _id: "6684dcc62182ea43e6103e62",
            scaled: true,
            url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/0f86a0bbb044d2bfc21f224456f2044a/photo-1719328555718-90eb4fac3e31.webp",
            bytes: 21922,
            height: 320,
            width: 480,
          },
        ],
        brightness: "light",
      },
      {
        bg: "#7e8d90",
        fontColor: "#000",
        id: "PsFBt",
        photographer: "Plwel Czerwinski",
        scaledImgs: [
          {
            id: "6684dd435af9199cb6283700",
            _id: "6684dd435af9199cb6283700",
            scaled: true,
            url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/67x100/753af4c32d1d87db146413e85ab15ece/photo-1719844841024-3c7166816fc7.webp",
            bytes: 1104,
            height: 100,
            width: 67,
          },
          {
            id: "6684dd435af9199cb6283701",
            _id: "6684dd435af9199cb6283701",
            scaled: true,
            url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/128x192/753af4c32d1d87db146413e85ab15ece/photo-1719844841024-3c7166816fc7.webp",
            bytes: 2946,
            height: 192,
            width: 128,
          },
          {
            id: "6684dd435af9199cb6283702",
            _id: "6684dd435af9199cb6283702",
            scaled: true,
            url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/320x480/753af4c32d1d87db146413e85ab15ece/photo-1719844841024-3c7166816fc7.webp",
            bytes: 13346,
            height: 480,
            width: 320,
          },
        ],
        brightness: "light",
      },
      {
        bg: "#d9d3c3",
        fontColor: "#000",
        id: "ZSfv7J",
        photographer: "Eberhard Grossgasteiger",
        scaledImgs: [
          {
            id: "6684dcba9bd9eadcbe170caa",
            _id: "6684dcba9bd9eadcbe170caa",
            scaled: true,
            url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/140x93/45fe2b2cb99b9307e941023890f4fe2f/photo-1719217469234-bb53c12ed515.webp",
            bytes: 1472,
            height: 93,
            width: 140,
          },
          {
            id: "6684dcba9bd9eadcbe170cab",
            _id: "6684dcba9bd9eadcbe170cab",
            scaled: true,
            url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/256x171/45fe2b2cb99b9307e941023890f4fe2f/photo-1719217469234-bb53c12ed515.webp",
            bytes: 3522,
            height: 171,
            width: 256,
          },
          {
            id: "6684dcba9bd9eadcbe170cac",
            _id: "6684dcba9bd9eadcbe170cac",
            scaled: true,
            url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/45fe2b2cb99b9307e941023890f4fe2f/photo-1719217469234-bb53c12ed515.webp",
            bytes: 9048,
            height: 320,
            width: 480,
          },
        ],
        brightness: "light",
      },
      {
        bg: "#e2e6e6",
        fontColor: "#fff",
        id: "Ui4Dng",
        photographer: "George Bale",
        scaledImgs: [
          {
            id: "6684dd0c0378ec4fd5affe96",
            _id: "6684dd0c0378ec4fd5affe96",
            scaled: true,
            url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/140x79/c1e752f0947b58d7bf9cd82cd2855e0f/photo-1719357101152-32d926e518d4.webp",
            bytes: 1994,
            height: 79,
            width: 140,
          },
          {
            id: "6684dd0c0378ec4fd5affe97",
            _id: "6684dd0c0378ec4fd5affe97",
            scaled: true,
            url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/256x144/c1e752f0947b58d7bf9cd82cd2855e0f/photo-1719357101152-32d926e518d4.webp",
            bytes: 5474,
            height: 144,
            width: 256,
          },
          {
            id: "6684dd0c0378ec4fd5affe98",
            _id: "6684dd0c0378ec4fd5affe98",
            scaled: true,
            url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x270/c1e752f0947b58d7bf9cd82cd2855e0f/photo-1719357101152-32d926e518d4.webp",
            bytes: 17200,
            height: 270,
            width: 480,
          },
        ],
        brightness: "light",
      },
      {
        bg: "#f2f2fb",
        fontColor: "#000",
        id: "W3Vgbg",
        photographer: "Eberhard Grossgasteiger",
        scaledImgs: [
          {
            id: "6684dd1343b8a9a9a6298b97",
            _id: "6684dd1343b8a9a9a6298b97",
            scaled: true,
            url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/67x100/f09c338fecffe282c5311ee0c4dccd76/photo-1719216324560-523fc4ddb8b9.webp",
            bytes: 1230,
            height: 100,
            width: 67,
          },
          {
            id: "6684dd1343b8a9a9a6298b98",
            _id: "6684dd1343b8a9a9a6298b98",
            scaled: true,
            url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/128x192/f09c338fecffe282c5311ee0c4dccd76/photo-1719216324560-523fc4ddb8b9.webp",
            bytes: 3350,
            height: 192,
            width: 128,
          },
          {
            id: "6684dd1343b8a9a9a6298b99",
            _id: "6684dd1343b8a9a9a6298b99",
            scaled: true,
            url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/320x480/f09c338fecffe282c5311ee0c4dccd76/photo-1719216324560-523fc4ddb8b9.webp",
            bytes: 17352,
            height: 480,
            width: 320,
          },
        ],
        brightness: "light",
      },
    ],
    activities: [
      {
        id: utilService.makeId(24),
        type: "createBoard",
        userFullName: user.fullName,
        userId: user.id,
        timeStamp: 1722015726446,
      },
    ],
  };
}

function createNewLabel(name, color) {
  return {
    id: makeId(),
    name: name,
    color: color,
  };
}
function getBaseColors() {
  return boardLabelColorOptions.filter((color) => color.isCover);
}

const bgImgs = [
  {
    background: "668946a613fbf45a2101e3aa",
    title: "Viktoriya",
    backgroundColor: "#1e3b20",
    backgroundImage:
      "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/583b7e8d8e177ce7a33da9c49ff89a75/photo-1719825718360-7de63c92135f",
    backgroundBrightness: "dark",
    backgroundImageScaled: [
      {
        width: 73,
        height: 100,
        url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/73x100/3e847eff31d4e7a927836e07fba3e3fe/photo-1719825718360-7de63c92135f.webp",
      },
      {
        width: 139,
        height: 192,
        url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/139x192/3e847eff31d4e7a927836e07fba3e3fe/photo-1719825718360-7de63c92135f.webp",
      },
      {
        width: 348,
        height: 480,
        url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/348x480/3e847eff31d4e7a927836e07fba3e3fe/photo-1719825718360-7de63c92135f.webp",
      },
    ],
  },
  {
    background: "6689477fee7b57e70a601b46",
    title: "Ashford Marx",
    backgroundColor: "#637270",
    backgroundImage:
      "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/445dea137da3ef754471fc4dd6dc74be/photo-1719996510843-25348b436dcc",
    backgroundBrightness: "dark",
    backgroundImageScaled: [
      {
        width: 67,
        height: 100,
        url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/67x100/6fc8d04b515bb9d2f3edc07bcc55e9e7/photo-1719996510843-25348b436dcc.webp",
      },
      {
        width: 128,
        height: 192,
        url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/128x192/6fc8d04b515bb9d2f3edc07bcc55e9e7/photo-1719996510843-25348b436dcc.webp",
      },
      {
        width: 320,
        height: 480,
        url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/320x480/6fc8d04b515bb9d2f3edc07bcc55e9e7/photo-1719996510843-25348b436dcc.webp",
      },
    ],
  },
  {
    background: "6689479b23f99fc8d05a696c",
    backgroundColor: "#c9cdc2",
    title: "Zo Razafindramamba",
    backgroundImage:
      "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/cd1b0e862504085ae903290e12238a8c/photo-1719822077838-b48bf2c7903d",
    backgroundBrightness: "light",
    backgroundImageScaled: [
      {
        width: 63,
        height: 100,
        url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/63x100/ab595d4ac47daf1ef87e362f824f1cec/photo-1719822077838-b48bf2c7903d.webp",
      },
      {
        width: 121,
        height: 192,
        url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/121x192/ab595d4ac47daf1ef87e362f824f1cec/photo-1719822077838-b48bf2c7903d.webp",
      },
      {
        width: 301,
        height: 480,
        url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/301x480/ab595d4ac47daf1ef87e362f824f1cec/photo-1719822077838-b48bf2c7903d.webp",
      },
    ],
  },
  {
    background: "6689473085f1629ee989e316",
    title: "eberhard 🖐 grossgasteiger",
    backgroundColor: "#a46e12",
    backgroundImage:
      "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/original/1364339982f947553dc5c27eb900632f/photo-1719329411191-be2cda36a37c",
    backgroundBrightness: "dark",
    backgroundImageScaled: [
      {
        width: 140,
        height: 93,
        url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/140x93/c7d26e3a7f0576c62bd3e7cafe6f8d76/photo-1719329411191-be2cda36a37c.webp",
      },
      {
        width: 256,
        height: 171,
        url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/256x171/c7d26e3a7f0576c62bd3e7cafe6f8d76/photo-1719329411191-be2cda36a37c.webp",
      },
      {
        width: 480,
        height: 320,
        url: "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/c7d26e3a7f0576c62bd3e7cafe6f8d76/photo-1719329411191-be2cda36a37c.webp",
      },
    ],
  },
];

const bgColors = [
  {
    background: "gradient-snow",
    backgroundColor: "#228CD5",
    backgroundImage:
      "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg",
    backgroundBrightness: "dark",
  },
  {
    background: "gradient-ocean",
    backgroundColor: "#0B50AF",
    backgroundImage:
      "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg",
    backgroundBrightness: "dark",
  },
  {
    background: "gradient-crystal",
    backgroundColor: "#674284",
    backgroundImage:
      "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/crystal.svg",
    backgroundBrightness: "dark",
  },
  {
    background: "gradient-rainbow",
    backgroundColor: "#A869C1",
    backgroundImage:
      "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/rainbow.svg",
    backgroundBrightness: "dark",
  },
  {
    background: "gradient-peach",
    backgroundColor: "#EF763A",
    backgroundImage:
      "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/peach.svg",
    backgroundBrightness: "dark",
  },
  {
    background: "gradient-flower",
    backgroundColor: "#F488A6",
    backgroundImage:
      "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/flower.svg",
    backgroundBrightness: "dark",
  },
];

function getBgImgs() {
  return bgImgs;
}

function getBgColors() {
  return bgColors;
}

function createCheckListItem(changes) {
  return {
    id: utilService.makeId(24),
    label: changes.label,
    isChecked: false,
    pos: 0,
    ...changes,
  };
}
function createCheckList(changes) {
  return {
    id: utilService.makeId(24),
    label: changes.label,
    pos: 0,
    checkItems: [],
    ...changes,
  };
}

function getEmojis() {
  return [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "🥳",
  ];
}

function measureExecutionTime(functionToMeasure) {
  const start = performance.now();
  functionToMeasure();
  const end = performance.now();
  const executionTime = end - start;
  console.log(`Execution time: ${executionTime} milliseconds`);
}

function isColorDark(r, g, b) {
  // Calculate the perceived brightness using the formula:
  // (0.299*R + 0.587*G + 0.114*B)
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return brightness < 0.5;
}

function getAverageBorderColor(imageSrc, borderWidth = 1) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // This enables CORS
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      // Top and bottom borders
      for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < borderWidth; y++) {
          let data = ctx.getImageData(x, y, 1, 1).data;
          r += data[0];
          g += data[1];
          b += data[2];
          count++;

          data = ctx.getImageData(x, img.height - 1 - y, 1, 1).data;
          r += data[0];
          g += data[1];
          b += data[2];
          count++;
        }
      }

      // Left and right borders
      for (let y = borderWidth; y < img.height - borderWidth; y++) {
        for (let x = 0; x < borderWidth; x++) {
          let data = ctx.getImageData(x, y, 1, 1).data;
          r += data[0];
          g += data[1];
          b += data[2];
          count++;

          data = ctx.getImageData(img.width - 1 - x, y, 1, 1).data;
          r += data[0];
          g += data[1];
          b += data[2];
          count++;
        }
      }

      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);

      const color = `rgb(${r},${g},${b})`;
      const isDark = isColorDark(r, g, b);

      resolve({ color, isDark });
    };
    img.onerror = reject;
    img.src = imageSrc;
  });
}
