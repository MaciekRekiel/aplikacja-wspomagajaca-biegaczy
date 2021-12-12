// km/h: MET_VALUE to burned calories for running
const MET_VALUES = {
  16.1: 14.5,
  14.5: 12.8,
  12.9: 11.8,
  11.3: 11,
  9.6: 10,
  8.0: 8.3,
  6.4: 6,
};

export const calc = (averageSpeed) => {
  const arr = Object.keys(MET_VALUES).sort((a, b) => {
    a = parseFloat(a);
    b = parseFloat(b);
    return a - b;
  });
  let MET = 6;
  arr.forEach((key) => {
    let keyValue = parseFloat(key);
    if (averageSpeed >= keyValue) {
      MET = MET_VALUES[key];
    }
  });
  return MET;
};
