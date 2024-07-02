import defaultProfile from "/img/defaultProfile.svg";
import checkListIcon from "/img/board-index/detailsImgs/checkListIcon.svg";

import coverIcon from "/img/board-index/detailsImgs/coverIcon.svg";
import fieldsIcon from "/img/board-index/detailsImgs/fieldsIcon.svg";
import file from "../../../../src/assets/svgs/file.svg";
import labelIcon from "/img/board-index/headerImgs/filterBtn-imgs/labelIcon.svg";
import clockIcon from "/img/board-index/headerImgs/filterBtn-imgs/clockIcon.svg";

import { SvgButton } from "../../CustomCpms/SvgButton";

export function TaskDetailsAddToCard() {
  const addToCard = [
    { svg: defaultProfile, text: "Members" },
    { svg: labelIcon, text: "Labels" },
    { svg: checkListIcon, text: "Checklist" },
    { svg: clockIcon, text: "Dates" },
    { svg: file, text: "Attachment" },
    { svg: coverIcon, text: "Cover" },
    { svg: fieldsIcon, text: "Custom Fields" },
  ];
  return (
    <section className="tittle">
      <p>Add to card</p>
      {addToCard.map((body) => (
        <SvgButton src={body.svg} label={body.text} key={body.text}/>
      ))}
    </section>
  );
}
