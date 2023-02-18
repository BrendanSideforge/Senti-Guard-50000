"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const tslib_1 = require("tslib");
const Eris = tslib_1.__importStar(require("eris"));
exports.command = {
    attributes: {
        name: "test",
        description: "testing command for Robo",
        options: [
            {
                "name": "animal",
                "description": "The type of animal",
                "type": Eris.Constants.ApplicationCommandOptionTypes.STRING,
                "required": true,
                "choices": [
                    {
                        "name": "Dog",
                        "value": "animal_dog"
                    },
                    {
                        "name": "Cat",
                        "value": "animal_cat"
                    },
                    {
                        "name": "Penguin",
                        "value": "animal_penguin"
                    }
                ]
            },
            {
                "name": "only_smol",
                "description": "Whether to show only baby animals",
                "type": Eris.Constants.ApplicationCommandOptionTypes.BOOLEAN,
                "required": false
            }
        ],
        type: Eris.Constants.ApplicationCommandTypes.CHAT_INPUT
    },
    callback: async (client, interaction) => {
        await interaction.createMessage("Created settings!");
    }
};
