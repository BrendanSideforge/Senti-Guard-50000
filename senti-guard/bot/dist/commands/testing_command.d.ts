export declare const command: {
    attributes: {
        name: string;
        description: string;
        options: ({
            name: string;
            description: string;
            type: 3;
            required: boolean;
            choices: {
                name: string;
                value: string;
            }[];
        } | {
            name: string;
            description: string;
            type: 5;
            required: boolean;
            choices?: undefined;
        })[];
        type: 1;
    };
    callback: (client: any, interaction: any) => Promise<void>;
};
