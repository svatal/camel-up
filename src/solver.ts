import { State, CamelId } from "./data";
import {
  CamelCounter,
  getBoard,
  getCamelPosition,
  getTowerOnPosition,
} from "./utils";

export function updateProbability(
  state: State,
  notMoved: CamelId[],
  counter: CamelCounter
) {
  if (notMoved.length === 0) {
    getBoard(state)
      .reduce((left, right) => [...left, ...right])
      .reverse()
      .forEach((cId, pos) => counter[cId][pos]++);
    return;
  }
  for (const cId of notMoved) {
    const newNotMoved = notMoved.filter((id) => id !== cId);
    const { pos: currentPosition } = getCamelPosition(state, cId);
    for (const moveLength of [1, 2, 3]) {
      const targetPos = currentPosition + moveLength;
      const occupants = getTowerOnPosition(state, targetPos);
      const newState = {
        ...state,
        [cId]: occupants[occupants.length - 1] ?? targetPos,
      };
      updateProbability(newState, newNotMoved, counter);
    }
  }
}
