import { useState, useEffect, useRef } from "react"

export function usePopoverPosition(anchorEl, isOpen) {
    const popoverRef = useRef(null)
    const [popoverStyle, setPopoverStyle] = useState({})
    const [initialPosition, setInitialPosition] = useState(null)

    useEffect(() => {
        if (isOpen && anchorEl && popoverRef.current) {
            const anchorRect = anchorEl.getBoundingClientRect()
            const initialPopoverStyle = {
                top: anchorRect.top + anchorRect.height + window.scrollY,
                left: anchorRect.left + window.scrollX,
                position: "absolute",
            }

            setInitialPosition(initialPopoverStyle)
            setPopoverStyle(initialPopoverStyle)

            console.log(
                "1. x and y of popover anchor element:",
                anchorRect.x,
                anchorRect.y,
            )
            console.log("2. Height of child component:", anchorRect.height)
            console.log(
                "3. x and y of child component:",
                anchorRect.left,
                anchorRect.top + window.scrollY + anchorRect.height,
            )
        }
    }, [isOpen])

    useEffect(() => {
        const handleScroll = () => {
            if (popoverRef.current && initialPosition) {
                const popoverRect = popoverRef.current.getBoundingClientRect()
                const windowWidth = window.innerWidth
                const windowHeight = window.innerHeight
                const newPopoverStyle = { ...initialPosition }

                if (popoverRect.left + popoverRect.width > windowWidth) {
                    newPopoverStyle.left = windowWidth - popoverRect.width - 5 // 5px отступ
                }
                if (popoverRect.top + popoverRect.height > windowHeight) {
                    newPopoverStyle.top = windowHeight - popoverRect.height - 5 // 5px отступ
                }
                if (popoverRect.left < 0) {
                    newPopoverStyle.left = 5
                }
                if (popoverRect.top < 0) {
                    newPopoverStyle.top = 5
                }

                setPopoverStyle(newPopoverStyle)
            }
        }

        if (isOpen) {
            window.addEventListener("scroll", handleScroll)
            window.addEventListener("resize", handleScroll)
            return () => {
                window.removeEventListener("scroll", handleScroll)
                window.removeEventListener("resize", handleScroll)
            }
        }
    }, [isOpen, initialPosition])

    return { popoverRef, popoverStyle }
}
