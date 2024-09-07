import { useEffect } from "react"
import { useSelector } from "react-redux"

export function DynamicFavicon() {
    const currentBoard = useSelector((state) => state.boardModule.board)

    useEffect(() => {
        let link = document.querySelector("link[rel~='icon']")
        if (!link) {
            link = document.createElement("link")
            link.rel = "icon"
            document.getElementsByTagName("head")[0].appendChild(link)
        }

        if (
            currentBoard &&
            currentBoard.prefs &&
            currentBoard.prefs.backgroundImage
        ) {
            // Assuming the backgroundImage is a URL
            link.href = currentBoard.prefs.backgroundImage
        } else {
            // Default favicon
            link.href = "/img/favIcon.png"
        }
    }, [currentBoard.id])

    return null // This component doesn't render anything
}
