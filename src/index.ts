import { CamelId, getAllCamels, State } from "./data";
import { updateProbability } from "./solver";
import {
  forEachCamel,
  getBoard,
  getEmptyCamelCounter,
  transformCamelMap,
} from "./utils";

const state: State = {
  [CamelId.Blue]: 0,
  [CamelId.Green]: 1,
  [CamelId.Orange]: 2,
  [CamelId.White]: CamelId.Blue,
  [CamelId.Yellow]: CamelId.White,
};

const board = getBoard(state);

console.log("starting board", board);

const first = getEmptyCamelCounter();
const second = getEmptyCamelCounter();

updateProbability(state, getAllCamels(), first, second);

const total = getAllCamels()
  .map((cId) => first[cId])
  .reduce((a, b) => a + b);

const pFirst = transformCamelMap(first, (n) => n / total);
const pSecond = transformCamelMap(second, (n) => n / total);

console.log("pFirst", pFirst);
console.log("pSecond", pSecond);

console.log(
  "expected return 5/1/-1",
  forEachCamel(
    (cId) => pFirst[cId] * 5 + pSecond[cId] - (1 - pFirst[cId] - pSecond[cId])
  )
);

console.log(
  "expected return 3/1/-1",
  forEachCamel(
    (cId) => pFirst[cId] * 3 + pSecond[cId] - (1 - pFirst[cId] - pSecond[cId])
  )
);
