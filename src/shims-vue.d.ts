declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module '@store'
declare module '@api'

interface Window {
   __POWERED_BY_QIANKUN__: string
}
