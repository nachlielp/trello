import file from "../../../../src/assets/svgs/file.svg";
import labelIcon from "/img/board-index/headerImgs/filterBtn-imgs/labelIcon.svg";
import clockIcon from "/img/board-index/headerImgs/filterBtn-imgs/clockIcon.svg";
import defaultProfile from "/img/defaultProfile.svg";
import checkListIcon from "/img/board-index/detailsImgs/checkListIcon.svg";

import { SvgButton } from "../../CustomCpms/SvgButton";

export function TaskDetailsActions() {
  const actions = [
    { svg: defaultProfile, text: "Move" },
    { svg: labelIcon, text: "Copy" },
    { svg: checkListIcon, text: "Make template" },
    { svg: clockIcon, text: "Archive" },
    { svg: file, text: "Share" },
  ];
  return (
    <section>
      <p>Actions</p>
      {actions.map((body) => (
        <SvgButton src={body.svg} label={body.text} key={body.text} />
      ))}
    </section>
  );
}
