import { useSelector } from "react-redux";
import { utilService } from "../../../services/util.service";
import { updateBoard } from "../../../store/board.actions";

export function ColorsBackgrounds() {
  const board = useSelector((state) => state.boardModule.board);

  function onPickGradient(bg) {
    const prefs = {
      background: bg.background,
      backgroundColor: bg.backgroundColor,
      backgroundImage: bg.backgroundImage,
      backgroundBrightness: bg.backgroundBrightness,
    };

    updateBoard({ ...board, prefs });
  }

  function onPickColor(bg) {
    const prefs = {
      background: bg.background,
      backgroundColor: bg.backgroundColor,
      backgroundImage: bg.backgroundImage,
      backgroundBrightness: bg.backgroundBrightness,
    };

    updateBoard({ ...board, prefs });
  }

  return (
    <section className="navigation">
      <section className="photos-bg">
        {utilService.getBgGradientColors().map((bg) => (
          <section
            onClick={() => onPickGradient(bg)}
            className="container"
            key={bg.background}
            style={{ backgroundImage: `url(${bg.backgroundImage})` }}
          >
            <span className="emoji">{bg.emoji}</span>
          </section>
        ))}
      </section>
      <hr className="border_bottom" />
      <section className="colors-picker">
        {utilService.getBgColors().map((color) => (
          <section
            onClick={() => onPickColor(color)}
            className="container"
            key={color.background}
            style={{ backgroundColor: color.backgroundColor }}
          ></section>
        ))}
      </section>
    </section>
  );
}
