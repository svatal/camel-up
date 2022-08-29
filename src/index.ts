import { CamelId, getAllCamels, CamelPositions } from "./data";
import { updateProbability } from "./solver";
import {
  forEachCamel,
  getBoard,
  getEmptyCamelCounter,
  transformCamelMap,
} from "./utils";

const state: CamelPositions = {
  [CamelId.Blue]: 0,
  [CamelId.Green]: 1,
  [CamelId.Orange]: 2,
  [CamelId.White]: CamelId.Blue,
  [CamelId.Yellow]: CamelId.Green,
};

const board = getBoard(state);

console.log("starting board", board);

const counter = getEmptyCamelCounter();

updateProbability(state, getAllCamels(), counter);

const total = getAllCamels()
  .map((cId) => counter[cId][0])
  .reduce((a, b) => a + b);

const pCounter = transformCamelMap(counter, (ns) => ns.map((n) => n / total));

console.log(
  "pFirst",
  transformCamelMap(pCounter, (ns) => ns[0])
);
console.log(
  "pSecond",
  transformCamelMap(pCounter, (ns) => ns[1])
);

console.log(
  "expected return 5/1/-1",
  forEachCamel(
    (cId) =>
      pCounter[cId][0] * 5 +
      pCounter[cId][1] -
      pCounter[cId][2] -
      pCounter[cId][3] -
      pCounter[cId][4]
  )
);

console.log(
  "expected return 3/1/-1",
  forEachCamel(
    (cId) =>
      pCounter[cId][0] * 3 +
      pCounter[cId][1] -
      pCounter[cId][2] -
      pCounter[cId][3] -
      pCounter[cId][4]
  )
);
