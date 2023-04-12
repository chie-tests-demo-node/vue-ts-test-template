/**
 * 是否是正式环境
 * @returns 
 */
export const isPro = () => process.env.NODE_ENV === "production";

/**
 * 获取是否是测试环境
 * @returns
 */
export const isDev = () => process.env.NODE_ENV === "development";

/**
 * 是否显示顶部菜单
 * @returns 
 */
export const showHeader = () => process.env.VUE_APP_HideHeader != '1';