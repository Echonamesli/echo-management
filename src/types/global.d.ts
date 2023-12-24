// * global
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
  type RootState = ReturnType<typeof import("@/store").getState>;
  declare module "vite-plugin-eslint";
}
export {};
