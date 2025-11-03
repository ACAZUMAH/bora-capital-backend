
export interface CronConfig {
    name: string;
    schedule: string;
    Job: () => Promise<void>;
    runOnInit?: boolean;
    enabled?: boolean;
}