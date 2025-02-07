const successOption = {
  option: 'Success',
  style: {
    fontFamily: 'Shantell Sans',
    fontSize: 36,
    textColor: '#ffffff',
  },
}

const failOption = {
  option: 'FAIL',
  style: {
    textColor: '#000000',
    fontFamily: 'Simpsonfont',
    fontSize: 40,
    lineHeight: 1,
  },
}

export const data = [
  { ...successOption },
  { ...failOption },
  { ...successOption },
  { ...failOption },
  { ...successOption },
  { ...failOption },
  { ...successOption },
  { ...failOption },
]
