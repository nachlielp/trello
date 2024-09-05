import { useSelector } from "react-redux";
import { utilService } from "../../../services/util.service";
import { updateBoard } from "../../../store/board.actions";

export function PhotosBackgrounds() {
  const board = useSelector(state => state.boardModule.board)
  function onPickPhoto(bg) {
    const prefs = {
      background: bg.background,
      backgroundColor: bg.backgroundColor,
      backgroundImage: bg.backgroundImage,
      backgroundBrightness: bg.backgroundBrightness,
      backgroundImageScaled: bg.backgroundImageScaled,
    };
   updateBoard({...board,prefs})
  }

  return (
    <section className="photos-bg navigation">
      {utilService.getBgImgs(false).map((bg) => (
        <section
          onClick={() => onPickPhoto(bg)}
          className="container photos"
          key={bg.background}
          style={{ backgroundImage: `url(${bg.backgroundImageScaled[2].url})` }}
        >
          <span className="title">{bg.title}</span>
        </section>
      ))}
    </section>
  );
}
