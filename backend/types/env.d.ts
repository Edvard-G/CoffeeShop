declare global {
  namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV:'development'|'production';
        PORT?:string;
        HOST:string;
        DB_NAME:string;
        DB_USER:string;
        DB_URI?:string;
    }
  }
}

export {};