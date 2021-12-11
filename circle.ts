type AnyFunc<T> = (member: T) => boolean

export type Circle<T> = {
  current: T
  members: T[]
  next: () => Circle<T>
  only: (check: AnyFunc<T>) => T | null
}

export const makeCircle = <T>(list: T[], index: number = 0): Circle<T> => {
  return {
    current: list[index],
    members: list,
    next: () => makeCircle(list, (index + 1) % list.length),
    only: (check) => {
      const found = list.filter(check)
      if (found.length !== 1) return null
      return found[0]
    }
  }
}