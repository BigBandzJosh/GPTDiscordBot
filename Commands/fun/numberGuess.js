const {SlashCommandBuilder} = require('discord.js');

//this needs work
module.exports = {
    data: new SlashCommandBuilder()
        .setName('numberguess')
        .setDescription('Replies with a number guessing game!'),
    async execute(interaction) {
     // Generates a random number between 1 and 10
const randomNumber = 1;

// Starts a loop with 3 attempts
let attempts = 3;
// While there are attempts left
while (attempts > 0) {
    // Asks the user for a number
    const userNumber = await interaction.reply('Guess a number between 1 and 10');
    //track specific user attempts and decrease attempts each time

    //if user is correct, break out of loop
    if (userNumber === randomNumber) {
        await interaction.editReply('You guessed the number!' + randomNumber);
        break;
    }
    // If the user didn't guess the number
    else {
        await interaction.editReply(`Wrong number! You have ${attempts} attempts left` + randomNumber);
        attempts--;
    }

    }
    },
};
    