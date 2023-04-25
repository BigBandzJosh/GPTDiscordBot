const {SlashCommandBuilder} = require('discord.js');
const {config} = require('dotenv');
config();
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ai')
        .setDescription('Replies with AI generated text!')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message for AI to process')
                .setRequired(true)),
    async execute(interaction) {
        //This is how you get the message from the user
        const userMessage = interaction.options.getString('message');
        // add user message to screen
        // send a thinking response
        await interaction.reply({ content: 'Thinking...', ephemeral: true })
        // create the message array
        const messages = [{ role: 'user', content: `User: ${userMessage}` }];
            try {
        //This is how you send a message back to the user
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            temperature: 0.9,
            n: 1,
            messages,
            stop: ['Human:', 'AI:'],
        });
      
        const aiResponse = response.data.choices[0].message.content;
        await interaction.editReply(`AI: ${aiResponse}`);
    } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
        await interaction.editReply({content: 'There was an error processing your request', ephemeral: true});
    }
        
    },
};