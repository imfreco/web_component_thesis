export const isAuthorized = (rolesRequired, rolesCurrent) => {
  let isAuthorized = false;
  for (let i = 0; i < rolesCurrent.length; i++) {
    if (rolesRequired.includes(rolesCurrent[i])) {
      isAuthorized = true;
      break;
    }
  }
  return isAuthorized;
};
