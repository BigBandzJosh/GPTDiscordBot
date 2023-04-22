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
        const message = interaction.options.getString('message');
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            temperature: 0.9,
            n: 1,
            messages: [{ role: 'user', content: message }],
            stop: ['Human:', 'AI:'],
        });
      
        const aiResponse = response.data.choices[0].message.content;
        await interaction.reply(`AI: ${aiResponse}`);
    },
};