/**
 * api请求地址
 * @returns
 */
export const getBaseUrl = () => process.env.VUE_APP_API_PREFIX;

/**
 * 接口请求超时时间
 * @returns
 */
export const getTimeOut = () => 30000;

/**
 * 分页大小
 */
export const pageSizes = [10, 20, 50, 100];

/**
 * 默认页码限制
 */
export const dfPageSize = 10;
