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
export const isUrl = (string: string) => {
  const protocolRE = /^(?:\w+:)?\/\/(\S+)$/;
  if (typeof string !== 'string') return false;
  return protocolRE.test(string);
};

// 从数组或字符串中获取字符串
export const getStringFromArrayOrString = (
  value?: string | string[],
  symbol = ','
) => {
  if (Array.isArray(value)) {
    return value.join(symbol);
  }
  return value;
};

// 渲染vnode
export const renderVnode = (vnode: JSX.Element | (() => JSX.Element)) => {
  if (typeof vnode === 'function') {
    return vnode();
  }
  return vnode;
};
