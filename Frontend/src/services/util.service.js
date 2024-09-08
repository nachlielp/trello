import { login } from "../store/user.actions"
import { bgColors, bgGradientColors, bgImgs } from "./Data"
import dayjs from "dayjs"

const boardLabelColorOptions = [
    {
        color: "skeleton",
        bgColor: "#091e420f",
        hoverdBgColor: "#091e4224",
        darkFontColor: "#B6C2CF",
        lightFontColor: "#172B4D",
    },
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
]

export const utilService = {
    makeId,
    getColorHashByName,
    capitalizeInitials,
    stringToColor,
    createNewTask,
    createNewGroup,
    boardLabelColorOptions,
    getBaseColors,
    createNewBoard,
    getBgImgs,
    getBgGradientColors,
    createNewLabel,
    createCheckListItem,
    createCheckList,
    getEmojis,
    getChecklistBadge,
    createActivity,
    isValidUrl,
    getAverageBorderColor,//
    isColorDark,//
    isNotEmpty,
    getBgColors,
    getDateLabel,
    taskDueStatus,
    datePreviewTitle,
    tooltipOuterStyle,
}

export const BOARDS_KEY = "boards"

function makeId(length = 6) {
    var txt = ""
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function isValidUrl(string) {
    try {
        new URL(string)
        return true
    } catch (err) {
        return false
    }
}

function getColorHashByName(colorName) {
    const color = boardLabelColorOptions.find(
        (color) => color.color === colorName,
    )
    return color
}

function capitalizeInitials(string) {
    return string
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
}
function createActivity(activity, user) {
    return {
        id: utilService.makeId(24),
        userFullName: user.fullName,
        userId: user.id,
        timeStamp: Date.now(),
        ...activity,
    }
}

export function stringToColor(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    let color = "#"
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff
        color += ("00" + value.toString(16)).substr(-2)
    }
    return color
}

function createNewTask(task) {
    return {
        id: utilService.makeId(),
        attachments: [],
        updatedAt: new Date().toISOString(),
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
    }
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
    }
}

function getChecklistBadge(checkLists) {
    const badges = {
        checkLists: {
            count: null,
            allChecked: false,
        },
    }
    if (!checkLists) return badges

    const flatCheckItems = checkLists.flatMap(
        (checklist) => checklist.checkItems,
    )

    const taskCheckedItemsCount = flatCheckItems.length

    const totalCheckdItemsLength = checkLists.reduce((sum, obj) => {
        const localItemsCount = obj.checkItems.filter(
            (item) => item.isChecked === true,
        ).length
        return sum + localItemsCount
    }, 0)

    if (taskCheckedItemsCount / totalCheckdItemsLength === 1) {
        badges.checkLists.allChecked = true
    }
    if (taskCheckedItemsCount) {
        badges.checkLists.count = `${totalCheckdItemsLength}/${taskCheckedItemsCount}`
    }
    return {
        count: badges.checkLists.count,
        allChecked: badges.checkLists.allChecked,
    }
}

async function createNewBoard(board) {
    const user = await login()

    const member = {
        id: user.id,
        permissionStatus: "admin",
        fullName: user.fullName,
    }
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
    }
}

function createNewLabel(name, color) {
    return {
        id: makeId(),
        name: name,
        color: color,
    }
}
function getBaseColors() {
    return boardLabelColorOptions.filter((color) => color.isCover)
}

function getBgImgs(slice = true) {
    if (slice) {
        return bgImgs.slice(0, 4)
    } else {
        return bgImgs
    }
}

function getBgGradientColors() {
    return bgGradientColors
}

function getBgColors() {
    return bgColors
}

function createCheckListItem(changes) {
    return {
        id: utilService.makeId(24),
        label: changes.label,
        isChecked: false,
        pos: 0,
        ...changes,
    }
}
function createCheckList(changes) {
    return {
        id: utilService.makeId(24),
        label: changes.label,
        pos: 0,
        checkItems: [],
        ...changes,
    }
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
    ]
}

function isColorDark(r, g, b) {
    // Calculate the perceived brightness using the formula:
    // (0.299*R + 0.587*G + 0.114*B)
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return brightness < 0.5
}

function getAverageBorderColor(imageSrc, borderWidth = 1) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = "Anonymous" // This enables CORS
        img.onload = function () {
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0, img.width, img.height)

            let r = 0,
                g = 0,
                b = 0,
                count = 0

            // Top and bottom borders
            for (let x = 0; x < img.width; x++) {
                for (let y = 0; y < borderWidth; y++) {
                    let data = ctx.getImageData(x, y, 1, 1).data
                    r += data[0]
                    g += data[1]
                    b += data[2]
                    count++

                    data = ctx.getImageData(x, img.height - 1 - y, 1, 1).data
                    r += data[0]
                    g += data[1]
                    b += data[2]
                    count++
                }
            }

            // Left and right borders
            for (let y = borderWidth; y < img.height - borderWidth; y++) {
                for (let x = 0; x < borderWidth; x++) {
                    let data = ctx.getImageData(x, y, 1, 1).data
                    r += data[0]
                    g += data[1]
                    b += data[2]
                    count++

                    data = ctx.getImageData(img.width - 1 - x, y, 1, 1).data
                    r += data[0]
                    g += data[1]
                    b += data[2]
                    count++
                }
            }

            r = Math.round(r / count)
            g = Math.round(g / count)
            b = Math.round(b / count)

            const color = `rgb(${r},${g},${b})`
            const isDark = isColorDark(r, g, b)

            resolve({ color, isDark })
        }
        img.onerror = reject
        img.src = imageSrc
    })
}

function isNotEmpty(value) {
    if (typeof value === "string") {
        return value.trim() !== ""
    }
    if (dayjs.isDayjs(value)) {
        return value.isValid()
    }
    return false
}

function taskDueStatus(task) {
    if (task.dueComplete) return ["completed", "This card is completed"]

    const dueDate = dayjs(task.due)
    const now = dayjs()
    const diff = dueDate.diff(now, "hours")

    if (diff < -24) return ["overdue", "This card is overdue"]
    if (diff < 0)
        return ["recently-overdue", "This card is due in the next 24 hours"]
    if (diff > 24) return ["due", "This card is due in the next 24 hours"]
    if (diff > 0) return ["due-soon", "This card is due in the next 24 hours"]
    return ["", ""]
}

function getDateLabel(date) {
    if (!date) return ""

    if (dayjs(date).isSame(dayjs(), "year")) {
        return dayjs(date).format("MMM D")
    } else {
        return dayjs(date).format("MMM D YYYY")
    }
}

function datePreviewTitle(start, due) {
    if (!isNotEmpty(start) && !isNotEmpty(due)) return ""
    if (isNotEmpty(start) && isNotEmpty(due))
        return `${getDateLabel(start)} - ${getDateLabel(due)}`
    if (isNotEmpty(start)) return `Start: ${getDateLabel(start)}`
    if (isNotEmpty(due)) return `Due: ${getDateLabel(due)}`
}

function tooltipOuterStyle() {
    return {
        padding: "1px 3px",
        minHeight: "16px",
        fontSize: "10px",
        borderRadius: "3px",
        backgroundColor: "#42546f",
    }
}
