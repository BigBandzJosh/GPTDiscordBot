const {SlashCommandBuilder} = require('discord.js');
const {config} = require('dotenv');
config();
const { Configuration, OpenAI } = require('openai');


const openai = new OpenAI({
    organization: process.env.ORGANIZATION_ID,
    apiKey: process.env.API_KEY});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ai')
        .setDescription('Replies with AI generated text!')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message for GPT-3.5-Turbo to process')
                .setRequired(true)),
    async execute(interaction) {
        //This is how you get the message from the user
        const userMessage = interaction.options.getString('message');
        // send a thinking response
        await interaction.reply('Thinking...')
        // create the message array
        const messages = [{ role: 'user', content: `User: ${userMessage}` }];
            try {
        //This is how you send a message back to the user
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            temperature: 0.9,
            n: 1,
            messages,
            stop: ['Human:', 'AI:'],
        });
      
        const aiResponse = response.choices[0].message.content;
        console.log(response.usage.total_tokens);
        console.log(response.model);
        await interaction.editReply(`${interaction.user.tag}: ${userMessage} \n\nAI: ${aiResponse}`);
    } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
        await interaction.editReply({content: 'There was an error processing your request', ephemeral: true});
    }
        
    },
};