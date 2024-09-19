import { createContext, useState } from "react";
import boxes from "./util/boxes";
import { formatTime } from "./util/helper";
import { boxtype } from "./Clock";
import { colorKeytype } from "./Clock";
export type MainContexttype = {
  state: stateType;
  changeState: (e: any) => void;
};
export interface stateType {
  boxes: boxtype[]
  colorKey: colorKeytype;
  realTime: Date;
  currentTime: {
    hours: number;
    minutes: number;
  };
  areNumbersVisible: boolean;
  isOptionsOpen: boolean;
  on_off_changing: boolean;
  start_stop_clock: boolean;
  SameDisplay: boolean;
}

export const MainContext = createContext<MainContexttype | null>(null);
function ContextProvider({ children }: { children: React.ReactNode }) {
  const initialTime = new Date();
  const initialHours = initialTime.getHours();
  const initialMinutes = initialTime.getMinutes();
  const initialSeconds = initialTime.getSeconds();

  const [MainState, setMainState] = useState<stateType>({
    boxes,
    colorKey: "sandy",
    realTime: initialTime,
    currentTime: formatTime(initialHours, initialMinutes, initialSeconds),
    areNumbersVisible: true,
    isOptionsOpen: false,
    on_off_changing: false,
    start_stop_clock: true,
    SameDisplay: true,
  });
  return (
    <MainContext.Provider
      value={{ state: MainState, changeState: setMainState }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default ContextProvider;
