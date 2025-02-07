export const sleep = async (time: number): Promise<null> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(null), time)
  })
