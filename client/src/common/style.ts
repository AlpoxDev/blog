export type LocationItem = {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
};

export type Location = LocationItem & {
  margin?: LocationItem;
  padding?: LocationItem;
};

export const LocationStyle = (location?: Location) => {
  // const { location } = props;
  if (!location) return '';

  let locations = '';
  if (location.left) locations += `margin-left: ${location.left};`;
  if (location.right) locations += `margin-right: ${location.right};`;
  if (location.top) locations += `margin-top: ${location.top};`;
  if (location.bottom) locations += `margin-bottom: ${location.bottom};`;

  const { margin, padding } = location;
  if (margin) {
    if (margin.left) locations += `margin-left: ${margin.left};`;
    if (margin.right) locations += `margin-right: ${margin.right};`;
    if (margin.top) locations += `margin-top: ${margin.top};`;
    if (margin.bottom) locations += `margin-bottom: ${margin.bottom};`;
  }
  if (padding) {
    if (padding.left) locations += `padding-left: ${padding.left};`;
    if (padding.right) locations += `padding-right: ${padding.right};`;
    if (padding.top) locations += `padding-top: ${padding.top};`;
    if (padding.bottom) locations += `padding-bottom: ${padding.bottom};`;
  }

  return locations;
};

// 4px 간격
// 0.25 rem = 4px(in PC), 3.5px(in Mobile)
export const spacing = (number: number) => {
  return `${number * 0.25}rem`;
};
