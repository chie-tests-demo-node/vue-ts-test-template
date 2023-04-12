/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-empty-interface */
//账号信息相关操作

import { isNull } from "@/utils";

//用户信息
export interface IUserInfo {
  /**
   * 租户ID
   */
  tenantId: string;
  /**
   * 角色名称
   */
  roleName: string;
  /**
   * 角色类型
   */
  roleType: string;
  /**
   * 登录标识
   */
  authentication: string;
  /**
   * 当前用户所有菜单信息
   */
  menuList: string;
}

const userInfoKey = "_ui";

//设置用户信息
export const userAuthSet = (userInfo: any) => {
  sessionStorage.setItem(userInfoKey, JSON.stringify(userInfo));
};

//读取当前用户信息
export const userAuthGet = (): IUserInfo | null => {
  var userInfoStr = sessionStorage.getItem(userInfoKey);
  if (isNull(userInfoStr)) {
    return null;
  }

  try {

    var userObj: IUserInfo = JSON.parse(userInfoStr!);
    return userObj;

  } catch (error) {

    return null;
  }
};

/**
 * 登出
 */
export const loginOut = () => {
  sessionStorage.removeItem(userInfoKey);
};

export interface IIsLoginRst {
  isLogin: boolean;
  authType?: 'login' | 'noLogin'
}


export const isLogin = () => {
  var userInfo = userAuthGet();
  return !isNull(userInfo?.tenantId);
}


export interface Menu {
  path: string;
  name: string;
}


/**
 * 获取当前登录用户的Menu信息
 * @returns 
 */
export const currentUserMenu = (): Menu[] => {
  const { menuList } = userAuthGet() || {};
  if (isNull(menuList)) {
    return [];
  }
  var orginMenus: any[];
  try {
    orginMenus = JSON.parse(menuList);
  } catch (error) {
    return [];
  }
  return orginMenus.map((m) => { return { path: m.menuCode, name: m.menuName } });
}


