declare namespace NodeJS {
  export interface ProcessEnv {
    readonly BASE_URL: string;
    readonly NEXT_PUBLIC_GG_CLIENT_ID: string;
    readonly ADMIN_DOMAIN: string;
    readonly HOST: string;
  }
}
