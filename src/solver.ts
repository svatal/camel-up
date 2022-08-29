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
  first: CamelCounter,
  second: CamelCounter
) {
  if (notMoved.length === 0) {
    const board = getBoard(state);
    const stack = board.reduce((left, right) => [...left, ...right]);
    first[stack[stack.length - 1]]++;
    second[stack[stack.length - 2]]++;
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
      updateProbability(newState, newNotMoved, first, second);
    }
  }
}
