export const renderTime = (time) => {
  let secValue = time % 60;
  let minValue = Math.floor(time / 60);
  let hourValue = Math.floor(time / 3600);
  minValue < 10 ? (minValue = `0${minValue}`) : null;
  secValue < 10 ? (secValue = `0${secValue}`) : null;
  hourValue < 10 ? (hourValue = `0${hourValue}`) : null;
  return `${hourValue}:${minValue}:${secValue}`;
};
