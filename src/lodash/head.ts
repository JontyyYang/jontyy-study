interface ArrayLike<T> {
  readonly length: number;
  [n: number]: T;
}
type List<T> = ArrayLike<T>;

const head = <T>(array: List<T>): T | undefined => {
  if (Array.isArray(array) && array.length) {
    return array[0];
  } else {
    return undefined;
  }
};

export default head;
