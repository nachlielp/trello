import { Card } from "antd";
import { utilService } from "../../services/util.service";

export function TaskPreviewCover({ task }) {
    const taskMember = task.cover;

    const taskColorCoverStyle =
        taskMember.color
            ? { backgroundColor: utilService.getColorHashByName(taskMember.color) }
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
        >
            <section className={`group-task-content ${taskMember.idUploadedBackground ? "image-cover" : ""}`} >
                <span className="group-task-content-title">{task.name}</span>
            </section>
        </Card>
    );
}
