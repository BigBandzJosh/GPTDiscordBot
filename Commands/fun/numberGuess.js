const {SlashCommandBuilder} = require('discord.js');

//this needs work
module.exports = {
    data: new SlashCommandBuilder()
        .setName('numberguess')
        .setDescription('Replies with a number guessing game!'),
    async execute(interaction) {
     // Generates a random number between 1 and 10
const randomNumber = Math.floor(Math.random() * 10) + 1;

// Starts a loop with 3 attempts
let attempts = 3;
// While there are attempts left
while (attempts > 0) {
    try {
    // Wait for a message from the user
    const response = await interaction.parseIntents('Please guess a number between 1 and 10');
    // Parse the message as a number
    const guess = parseInt(response.first().content);
    // If the message is not a number
    if (isNaN(guess)) {
        await interaction.reply('That is not a number!');
    // If the guess is correct
    } else if (guess === randomNumber) {
        await interaction.reply('You win!');
        break;
    // If the guess is incorrect
    } else {
        // Decrease the number of attempts
        attempts--;
        // Tell the user how many attempts they have left
        await interaction.reply(`Wrong! You have ${attempts} attempts left!`);
    }
} catch (error) {
    console.error(`Error executing ${interaction.commandName}`);
    console.error(error);
    await interaction.editReply({content: 'There was an error processing your request', ephemeral: true});
}
// If the user ran out of attempts
if (attempts === 0) {
    await interaction.reply(`You lose! The number was ${randomNumber}`);
}     
    }
    },
};
    