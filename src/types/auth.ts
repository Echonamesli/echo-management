import type { MenuProps } from "antd";
export interface LoginRequest {
  [k: string]: string;
  name: string;
  password: string;
  code: string;
  originCode: string;
}
export interface User {
  name: string;
  age: string | number;
  tel: string;
  token: string;
}
export type MenuItem = Required<MenuProps>["items"][number];

export interface Menu {
  label: string;
  path: string;
  key?: string;
  children?: Menu[];
}

export interface ResponseMenu {
  list: Menu[];
}
