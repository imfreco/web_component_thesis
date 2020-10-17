export const isOnMenuDetails = (menuDetails, componentId) => {
  return menuDetails.find((detail) => detail.componentId === componentId);
};
