export const userHasPermission = (
  userRol,
  permittedRoles,
  element_owner_id = true,
  user_id = true
) => {
  return permittedRoles.includes(userRol) && element_owner_id === user_id;
};
