declare namespace NodeJS {
  interface Global {
    __LOG_LEVEL__: keyof Console;
  }
}
