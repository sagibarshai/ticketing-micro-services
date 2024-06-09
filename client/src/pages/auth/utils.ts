export const isEmailValid = (email: string): boolean => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (email.match(regex)) return true;
  return false;
};
export const isPasswordValid = (password: string): boolean => {
  if (password.length <= 5) return false;
  if (password.length >= 21) return false;
  return true;
};
