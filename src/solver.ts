import { CamelPositions, CamelId, getAllCamels } from "./data";
import {
  CamelCounter,
  getBoard,
  getCamelPosition,
  getTowerOnPosition,
} from "./utils";

export function updateProbability(
  camelPositions: CamelPositions,
  notMoved: CamelId[],
  counter: CamelCounter
) {
  if (notMoved.length === 0) {
    getBoard(camelPositions)
      .reduce((left, right) => [...left, ...right])
      .reverse()
      .forEach((cId, pos) => counter[cId][pos]++);
    return;
  }
  for (const cId of notMoved) {
    const newNotMoved = notMoved.filter((id) => id !== cId);
    const { pos: currentPosition } = getCamelPosition(camelPositions, cId);
    for (const moveLength of [1, 2, 3]) {
      const targetPos = currentPosition + moveLength;
      const occupants = getTowerOnPosition(camelPositions, targetPos);
      const newCamelPositions = {
        ...camelPositions,
        [cId]: occupants[occupants.length - 1] ?? targetPos,
      };
      updateProbability(newCamelPositions, newNotMoved, counter);
    }
  }
}
