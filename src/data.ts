export enum CamelId {
  Blue = "Blue",
  Green = "Green",
  Orange = "Orange",
  Yellow = "Yellow",
  White = "White",
}

export type CamelPos = number | CamelId;

export function isCamelId(id: CamelPos): id is CamelId {
  return typeof id === "string";
}

export function getAllCamels() {
  return Object.values(CamelId);
}

export type State = Record<CamelId, CamelPos>;
