/**
 * 首字母大写
 * @param str
 * @returns
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 是否为url
 * @param string
 * @returns
 */
export function isUrl(string: string) {
  const protocolRE = /^(?:\w+:)?\/\/(\S+)$/;
  if (typeof string !== 'string') return false;
  return protocolRE.test(string);
}
