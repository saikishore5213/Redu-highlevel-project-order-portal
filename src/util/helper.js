export const capitalizeFirstLetter = (letter) => {
  return letter?.charAt(0).toUpperCase() + letter?.slice(1);
};

export const handleEnterKeyPress = (target, action) => {
  // to handle enter key press
  if (target?.charCode === 13) {
    action();
  }
};

export const showTab = (roles, requiredRole) => {
  if (roles && roles.length > 0) {
    return roles.includes(requiredRole);
  }
  return false;
};
