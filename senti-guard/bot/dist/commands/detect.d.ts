export declare const command: {
    attributes: {
        name: string;
        description: string;
        options: {
            name: string;
            description: string;
            type: 6;
            required: boolean;
        }[];
        type: 1;
    };
    callback: (client: any, interaction: any) => Promise<void>;
};
