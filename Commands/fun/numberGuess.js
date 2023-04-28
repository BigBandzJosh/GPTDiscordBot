const {SlashCommandBuilder} = require('discord.js');

//this needs work
module.exports = {
    data: new SlashCommandBuilder()
        .setName('numberguess')
        .setDescription('Replies with a number guessing game!')
        .addStringOption(option =>
            option.setName('number')
                .setDescription('The number to guess')
                .setRequired(true)),
        async execute(interaction) {
            const randomNumber = Math.floor(Math.random() * 10) + 1;
            let attempts = 3;

            await interaction.reply('Guess a number between 1 and 10!');
          
            while (attempts > 0) {
                const userNumber = interaction.options.getString('number');
                const Number = parseInt(userNumber);
                if (Number === randomNumber) {
                    await interaction.reply('You guessed the number!' + randomNumber  + 'was the number');
                    break;
                } else {
                    attempts--;
                    await interaction.reply(`That was wrong! You have ${attempts} attempts left.`);
                }
            }
        },
};
            
              