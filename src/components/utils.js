//see gatsby-node.js for where we do the same when building the page object
export const dropPrefix = value => {
  const reg = /^[0-9]+-|(?<=\/)[0-9]+-/gm;
  if (value.match(reg)) {
    value = value.replace(reg, '')
  }
  return value;
};
