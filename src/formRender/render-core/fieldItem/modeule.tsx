export const getPath = (path?: string[] | string) => {
  if (!path) {
    return;
  }
  if (Array.isArray(path)) {
    return path.join('.');
  }
  return path;
};
