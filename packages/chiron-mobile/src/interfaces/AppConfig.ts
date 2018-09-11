import { ActivityConfig } from './ActivityConfig';

export interface AppConfig {
  library: 'react' | 'preact' | 'vue';
  name: string;
  icon?: string;
  description?: string;
  appId: string;
  namespace: string;
  activities: ActivityConfig,
}
