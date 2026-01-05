export const mapRange = (
  num: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number,
  limit_range: boolean = false,
  easing: (x: number) => number = (x) => x
): number => {
  let result =
    easing((num - in_min) / (in_max - in_min)) * (out_max - out_min) + out_min;
  if (limit_range) {
    if (out_min < out_max) {
      result = Math.max(out_min, result);
      result = Math.min(out_max, result);
    } else {
      result = Math.max(out_max, result);
      result = Math.min(out_min, result);
    }
  }
  return result;
};

export interface Vector {
  x: number;
  y: number;
}

export const getVector = (pointA: Vector, pointB: Vector): Vector => ({
  x: pointA.x - pointB.x,
  y: pointA.y - pointB.y,
});

export const calculateDistance = (
  { x: x1, y: y1 }: Vector,
  { x: x2, y: y2 }: Vector
): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

export const getVectorMagnitude = (vector: Vector): number =>
  Math.sqrt(vector.x ** 2 + vector.y ** 2);

export const getNormalisedVector = (
  vector: Vector,
  desiredMagnitude: number = 1
): Vector => {
  const magnitude = getVectorMagnitude(vector);
  if (magnitude === 0) return { x: 0, y: 0 };
  return {
    x: (vector.x / magnitude) * desiredMagnitude,
    y: (vector.y / magnitude) * desiredMagnitude,
  };
};

export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  threshhold: number,
  scope: any = {}
): ((...args: Parameters<T>) => void) => {
  threshhold || (threshhold = 250);
  let last: number | undefined;
  let deferTimer: ReturnType<typeof setTimeout> | undefined;

  return function (this: any, ...args: Parameters<T>) {
    const context = scope || this;
    const now = +new Date();

    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};
