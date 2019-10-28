export const randMinMax = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);

export function log<T>(v: T): T {
  return console.log(v), v;
}
