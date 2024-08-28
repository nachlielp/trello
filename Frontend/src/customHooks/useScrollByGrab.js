import { useRef, useState, useEffect } from 'react';

const useScrollByGrab = () => {
    const scrollContainerRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [scrollDisabled, setScrollDisabled] = useState(false);

    const scrollSpeed = (distance) => {
        return Math.min(Math.abs(distance) / 5, 20) * Math.sign(distance);
    };

    const isInsideContainer = (target) => {
        return target.closest('.board-group-container') !== null;
    };

    const isInsideCard = (target) => {
        return target.closest('.ant-card') !== null;
    };

    const handleMouseDown = (e) => {
        const scrollContainer = scrollContainerRef.current;
        const isInsideBoardGroupContainer = isInsideContainer(e.target);
        const isInsideAntCard = isInsideCard(e.target);

        if (isInsideAntCard) {
            setScrollDisabled(true);
            return;
        }

        if (!isInsideBoardGroupContainer && e.target !== scrollContainer) return;

        setIsDown(true);
        setStartX(e.pageX - scrollContainer.offsetLeft);
        setScrollLeft(scrollContainer.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDown(false);
    };

    const handleMouseUp = () => {
        setIsDown(false);
        setScrollDisabled(false); // Re-enable scrolling
    };

    const handleMouseMove = (e) => {
        if (!isDown || isDragging || scrollDisabled) return;
        e.preventDefault();
        const scrollContainer = scrollContainerRef.current;
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = x - startX;
        scrollContainer.scrollLeft = scrollLeft - walk;
    };

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setScrollDisabled(false); // Re-enable scrolling
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;
        setDragPosition({ x: e.clientX, y: e.clientY });
    };

    const autoScroll = () => {
        if (!isDragging || scrollDisabled) return;

        const scrollContainer = scrollContainerRef.current;
        const containerRect = scrollContainer.getBoundingClientRect();

        let scrollBy = 0;

        const edgeThreshold = 100; // Threshold in pixels from the edge of the container

        if (dragPosition.x > containerRect.right - edgeThreshold) {
            const distance = dragPosition.x - (containerRect.right - edgeThreshold);
            scrollBy = scrollSpeed(distance);
        } else if (dragPosition.x < containerRect.left + edgeThreshold) {
            const distance = (containerRect.left + edgeThreshold) - dragPosition.x;
            scrollBy = -scrollSpeed(distance);
        }

        if (scrollBy) {
            scrollContainer.scrollLeft += scrollBy;
        }

        requestAnimationFrame(autoScroll);
    };

    useEffect(() => {
        if (isDragging && !scrollDisabled) {
            requestAnimationFrame(autoScroll);
        }
    }, [isDragging, dragPosition, scrollDisabled]);

    return {
        scrollContainerRef,
        handlers: {
            onMouseDown: handleMouseDown,
            onMouseLeave: handleMouseLeave,
            onMouseUp: handleMouseUp,
            onMouseMove: handleMouseMove,
            onDragStart: handleDragStart,
            onDragEnd: handleDragEnd,
            onMouseMoveCapture: handleDragMove,
        }
    };
};

export default useScrollByGrab;
