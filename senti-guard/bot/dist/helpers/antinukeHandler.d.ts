export declare function deleteAntinukeLog(log_id: number): Promise<any>;
export declare function getAntinukeLogs(supabase: any, guild_id: any, user_id: any, action: any): Promise<any>;
export declare function createAntinukeLog(redis: any, guild_id: any, user_id: any, reason: any, action_type: string, timestamp: Date, meta_data: any): Promise<void>;
