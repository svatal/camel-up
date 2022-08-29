import { CamelPositions, CamelId, getAllCamels, isCamelId } from "./data";

export function getCamelPosition(state: CamelPositions, camelId: CamelId) {
  let pos = state[camelId];
  let level = 0;
  while (isCamelId(pos)) {
    pos = state[pos];
    level++;
  }
  return { pos, level };
}

export function getTowerOnPosition(
  state: CamelPositions,
  position: number | CamelId
): CamelId[] {
  const camel = getAllCamels().find((cId) => state[cId] === position);
  if (camel === undefined) return [];
  return [camel, ...getTowerOnPosition(state, camel)];
}

export function getBoard(state: CamelPositions) {
  const s: CamelId[][] = []; // Array.from({ length: 18 }, () => []);
  for (const camelId of getAllCamels()) {
    const { pos, level } = getCamelPosition(state, camelId);
    s[pos] = s[pos] ?? [];
    s[pos][level] = camelId;
  }
  return s;
}

export type CamelCounter = Record<
  CamelId,
  [number, number, number, number, number]
>;

export function getEmptyCamelCounter(): CamelCounter {
  return forEachCamel(() => [0, 0, 0, 0, 0]);
}

export function forEachCamel<T>(
  mapFn: (camelId: CamelId) => T
): Record<CamelId, T> {
  return getAllCamels().reduce((obj, cId) => {
    obj[cId] = mapFn(cId);
    return obj;
  }, {} as Record<CamelId, T>);
}

export function transformCamelMap<TIn, TOut>(
  input: Record<CamelId, TIn>,
  mapFn: (i: TIn) => TOut
): Record<CamelId, TOut> {
  return forEachCamel((cId) => mapFn(input[cId]));
}
