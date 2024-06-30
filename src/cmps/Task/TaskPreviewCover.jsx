import { Card } from "antd";
import { useState } from "react";
import { utilService } from "../../services/util.service";
import { TaskPreviewEditModal } from "./TaskPreviewEditModal";

export function TaskPreviewCover({ task, editTask }) {
    const [isHovered, setIsHovered] = useState(false);
    const taskMember = task.cover;

    const taskColorCoverStyle =
        taskMember.color
            ? { backgroundColor: utilService.getColorHashByName(taskMember.color).bgColor }
            : {};

    const taskBackgroundCoverImage = taskMember.idUploadedBackground
        ? {
            backgroundImage: `url(${taskMember.scaled[2].url})`,
            backgroundSize: "cover",
        }
        : {};

    const componentClass = taskMember.color ? "task-bg-cover" : taskMember.idUploadedBackground ? "task-img-cover" : "";

    return (
        <Card
            className={`group-task  custom-card ${componentClass}`}
            style={{ ...taskColorCoverStyle, ...taskBackgroundCoverImage }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <TaskPreviewEditModal task={task} isHovered={isHovered} editTask={editTask} />
            <section className={`group-task-content ${taskMember.idUploadedBackground ? "image-cover" : ""}`} >
                <span className="group-task-content-title">{task.name}</span>
            </section>
        </Card>
    );
}
