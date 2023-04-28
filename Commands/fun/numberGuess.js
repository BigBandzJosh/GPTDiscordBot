const {SlashCommandBuilder} = require('discord.js');

//this needs work
module.exports = {
    data: new SlashCommandBuilder()
        .setName('numberguess')
        .setDescription('Replies with a number guessing game!'),
    async execute(interaction) {
     const randomNumber = Math.floor(Math.random() * 10) + 1;

     let attempts = 3;

     while (attempts > 0) {
            const filter = (m) => {
                if (m.author.id !== interaction.user.id) return false;
                const int = parseInt(m.content);
                return !isNaN(int) && int >= 1 && int <= 10;
            };
            const message = await interaction.reply("Guess a number between 1 and 10");
            
            const guess = await interaction.options.getString({
                filter,
                max: 1,
                time: 10000,
                errors: ['time']

            });
            if (guess.size === 0)
                 await interaction.editReply("You didn't reply in time!");
                break;
            }
            const userChoice = parseInt(guess.first().content);
            if (userChoice === randomNumber) {
                await interaction.editReply("You got it right!");
            } else {
                await interaction.editReply(`You got it wrong! The number was ${randomNumber}`);
                attempts--;
                if (attempts > 0) {
                    await interaction.editReply(`You have ${attempts} attempts left!`);
                } else {
                    await interaction.editReply("You have no attempts left!");
                }
            }
        }
    }

