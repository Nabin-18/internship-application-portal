
export const getInitials = (name: string) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0) + parts[0].slice(-1);
  } else {
    return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
  }
};
