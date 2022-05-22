interface ArrayLike<T> {
  readonly length: number;
  readonly [n: number]: T;
}

type List<T> = ArrayLike<T>;

type PartialShallow<T> = {
  [P in keyof T]?: T[P] extends object ? object : T[P];
};
type PropertyName = string | number | symbol;

type IterateeShorthand<T> = PropertyName | [PropertyName, any] | PartialShallow<T>;

type ListIterator<T, TResult> = (value: T, index: number, collection: List<T>) => TResult;

type ListIterateeCustom<T, TResult> = ListIterator<T, TResult> | IterateeShorthand<T>;

const findIndex = <T>(
  array: List<T> | null | undefined,
  predicate?: ListIterateeCustom<T, boolean>,
  fromIndex?: number
): number => {
  if (array === null || array === undefined) {
    return 0;
  }
  const type = typeof predicate;
  const index = fromIndex === undefined ? 0 : fromIndex;

  if (type === 'undefined') {
    return 0;
  } else if (type === 'string') {
    for (let i = index; i !== array?.length; i++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (array[i]?.[predicate] === true) {
        return i;
      }
    }
  } else if (type === 'function') {
    for (let i = index; i !== array?.length; i++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (predicate(array[i])) {
        return i;
      }
    }
  } else if (type === 'object' && Array.isArray(predicate)) {
    for (let i = index; i !== array?.length; i++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (array[i]?.[predicate[0]] === predicate[1]) {
        return i;
      }
    }
  } else if (type === 'object') {
    for (let i = index; i !== array?.length; i++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore

      if (JSON.stringify(array[i]) === JSON.stringify(predicate)) {
        return i;
      }
    }
  }
  return -1;
};

export default findIndex;
