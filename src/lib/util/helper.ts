import boxCombos from './boxCombos';
import boxes from './boxes';
type hours=number;
type minutes = hours;
type seconds = minutes;

export type boxextype = typeof boxes;
export type BoxCombosType = typeof boxCombos;
export type BoxCombosTypeIndex = keyof BoxCombosType;
export function formatHours (hours:hours) {
    if (hours === 0) {
      return 12
    } else if (hours > 12) {
      return hours - 12
    } else {
      return hours
    }
  }
  
  export function formatMinutes (minutes:minutes, seconds:seconds) {
    const totalSeconds = (minutes * 60) + seconds
    return Math.round(totalSeconds / 300) * 5
  }
  
  export function formatTime (hours:hours, minutes:minutes, seconds:seconds) {
    let adjustedHours = formatHours(hours);
    let adjustedMinutes = formatMinutes(minutes, seconds);
  
    if (adjustedMinutes === 60) {
      adjustedHours = formatHours(hours + 1);
      adjustedMinutes = 0;
    }
    if (adjustedMinutes < 0) {
      adjustedHours = formatHours(hours - 1);
      adjustedMinutes = 55;
    }
  
    return {
      hours: adjustedHours,
      minutes: adjustedMinutes
    }
  }
  
  function getRandomCombo (value:number,SameDisplay:boolean) {
    const combosForValue = boxCombos[value as unknown as BoxCombosTypeIndex ];
    let randomCombo : number[] =[] ;
  
    if (combosForValue.length) {
      if (SameDisplay) randomCombo = combosForValue[0];
        else randomCombo = combosForValue[Math.floor(Math.random() * combosForValue.length)];
    }
  
    return randomCombo;
  }
  
  export function updateBoxes (boxes:boxextype, hours:hours, minutes:minutes,SameDisplay:boolean) {
    const comboForHours = getRandomCombo(hours,SameDisplay );
    const comboForMinutes = getRandomCombo(minutes / 5,SameDisplay);
  
    return boxes.map((box, index) => {
      const represents = [];
  
      if (comboForHours!.includes(index)) {
        represents.push('hours');
      }
  
      if (comboForMinutes!.includes(index)) {
        represents.push('minutes');
      }
  
      return Object.assign({}, box, { represents });
    })
  }
  