declare module 'sade' {
  export interface Program {
    version(ver: string): Program;

    option(...args: string[]): Program;

    command(...args: string[]): Program;

    describe(arg: string): Program;

    example(arg: string): Program;

    parse(args: string[]): Program;

    action(
      thunk: ((...args: any[]) => Promise<any>) | ((...args: any[]) => any),
    ): Program;
  }

  export default function(name: string): Program;
}

declare namespace NodeJS {
  interface Global {
    __LOG_LEVEL__: keyof Console;
  }
}
