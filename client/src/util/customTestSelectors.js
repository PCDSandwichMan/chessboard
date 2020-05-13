// - Abstracting logic for custom selector
export const findByTestAttr = (component, attr) => {
  console.log(attr)
  return component.find(`[data-test='${attr}']`);
};
