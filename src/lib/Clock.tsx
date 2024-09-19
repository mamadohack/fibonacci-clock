import classNames from "classnames";
import colors from "./util/colors";
interface ClockProps {
  boxes: boxtype[];
  colorKey: colorKeytype;
  areNumbersVisible: boolean;
}
export type colorKeytype = keyof typeof colors;
export interface boxtype {
  name: string;
  size: number;
  represents: never[];
}
interface BoxProps extends boxtype {
  colorKey: colorKeytype;
}
function Clock({ boxes, colorKey, areNumbersVisible }: ClockProps) {
  const clockClasses = classNames("clock", {
    "numbers-are-visible": areNumbersVisible,
  });
  return (
    <div className={clockClasses}>
      {boxes.map((box: boxtype) => (
        <Box key={box.name} {...box} colorKey={colorKey} />
      ))}
    </div>
  );
}

export default Clock;

const Box = ({ name, size, represents, colorKey }: BoxProps) => {
  let colorIndex = 0;
  if (represents.length === 1 && represents[0] === "hours") {
    colorIndex = 1;
  } else if (represents.length === 1 && represents[0] === "minutes") {
    colorIndex = 2;
  } else if (represents.length === 2) {
    colorIndex = 3;
  }

  return (
    <div
      className={`box ${name}`}
      style={{
        backgroundColor: colors[colorKey][colorIndex],
        color: colorIndex ? colors[colorKey][0] : "#000",
      }}
    >
      <div className="box-size">{size}</div>
    </div>
  );
};
