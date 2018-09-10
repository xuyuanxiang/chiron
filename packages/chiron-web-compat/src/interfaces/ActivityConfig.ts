export interface ActivityConfig {
  [stage: string]: {
    [intent: string]: {
      title?: string;
      description?: string;
      permission: {
        read: string[],
        write?: string[],
        action?: string[]
      },
      entry: string;
    }
  }
}
