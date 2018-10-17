declare module 'sade' {
  interface CommandOptions {
    default: boolean;
  }

  interface ParseOptions {
    /**
     * An object of keys whose values are a string or array of aliases.
     * These will be added to the parsed output with matching values.
     */
    alias?: { [key: string]: string | string[] };

    /**
     * A single key (or array of keys) that should be parsed as Booleans.
     */
    boolean?: string | string[];

    /**
     * An key:value object of defaults.
     * If a default is provided for a key, its type (typeof) will be used to cast parsed arguments.
     */
    default?: { [key: string]: string | number | boolean | any[] };

    /**
     * A single key (or array of keys) that should be parsed as Strings.
     */
    string?: string | string[];

    /**
     * Callback that is run when a parsed flag has not been defined as a known key or alias.
     * Its only parameter is the unknown flag itself; eg --foobar or -f.
     */
    unknown?: (flag: string) => void;
  }

  interface Sade {
    command(name: string, desc: string, opts: CommandOptions): Sade;

    version(version: string): Sade;

    option(name: string, desc: string, val: any): Sade;

    describe(desc: string): Sade;

    action(handler: any): Sade;

    example(info: string): Sade;

    help(info: string): Sade;

    parse(args: string[], opts: ParseOptions): Sade;
  }

  function SadeFactory(name: string): Sade;

  export = SadeFactory;
}
