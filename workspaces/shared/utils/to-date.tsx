export const toDate = (...dates) => snapshot => !snapshot ? snapshot :  dates.reduce((all, key) => ({
  ...snapshot,
  ...all,
  [key]: new Date(snapshot[key]),
}), {})
