import { useState, useEffect } from "react"

const formatDate = (date) => {
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    }
    return date.toLocaleDateString("en", options)
}

const formatTimeTodayOrTomorrow = (date, isTomorrow = false) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true }
    const timeString = date.toLocaleTimeString("en", options)
    return isTomorrow ? `tomorrow at ${timeString}` : `today at ${timeString}`
}

const getTimeString = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInSeconds = Math.floor((time - now) / 1000)

    if (diffInSeconds < 0) {
        // Handle past timestamps
        const pastDiffInSeconds = Math.abs(diffInSeconds)

        if (pastDiffInSeconds < 60) {
            return `${pastDiffInSeconds} ${pastDiffInSeconds === 1 ? "second" : "seconds"} ago`
        }

        const pastDiffInMinutes = Math.floor(pastDiffInSeconds / 60)
        if (pastDiffInMinutes < 60) {
            return `${pastDiffInMinutes} ${pastDiffInMinutes === 1 ? "minute" : "minutes"} ago`
        }

        const pastDiffInHours = Math.floor(pastDiffInMinutes / 60)
        if (pastDiffInHours < 24) {
            return `${pastDiffInHours} ${pastDiffInHours === 1 ? "hour" : "hours"} ago`
        }

        return formatDate(time)
    } else {
        // Handle future timestamps
        const diffInMinutes = Math.floor(diffInSeconds / 60)
        const diffInHours = Math.floor(diffInMinutes / 60)

        if (diffInHours < 24) {
            return formatTimeTodayOrTomorrow(time)
        } else if (diffInHours < 48) {
            return formatTimeTodayOrTomorrow(time, true)
        } else {
            return formatDate(time)
        }
    }
}

const useTime = (timestamp) => {
    const [timeString, setTimeString] = useState(getTimeString(timestamp))

    useEffect(() => {
        const updateInterval = () => {
            const now = new Date()
            const time = new Date(timestamp)
            const diffInSeconds = Math.floor((time - now) / 1000)

            if (diffInSeconds < 60 && diffInSeconds >= 0) {
                return 10000 // Refresh every 10 seconds for future times
            } else if (diffInSeconds >= -59 && diffInSeconds < 0) {
                return 10000 // Refresh every 10 seconds for past times within 60 seconds
            }

            const diffInMinutes = Math.floor(Math.abs(diffInSeconds) / 60)
            if (diffInMinutes < 60) {
                return 60000 // Refresh every minute
            }

            const diffInHours = Math.floor(diffInMinutes / 60)
            if (diffInHours < 24) {
                return 3600000 // Refresh every hour
            }

            return 86400000 // Refresh every day
        }

        const interval = setInterval(() => {
            setTimeString(getTimeString(timestamp))
        }, updateInterval())

        // Clear the interval on component unmount or when timestamp changes
        return () => clearInterval(interval)
    }, [timestamp])

    return timeString
}

export default useTime
