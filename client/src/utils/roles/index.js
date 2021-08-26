export const userHasPermission = (
  userRol,
  permittedRoles,
  element_owner_id,
  user_id
) => {
  return permittedRoles.includes(userRol) || element_owner_id === user_id;
};
