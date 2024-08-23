const fetch = require('node-fetch');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main(username) {
    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=user:${username}`);

        if (!response.ok) throw new Error(`GitHub API returned status ${response.status}`);

        const {
            items
        } = await response.json();

        if (items ?.length) {
            console.log(`Repositories for ${username}:`);
            console.log(`Total repositories for ${username}: ${items.length}`);
            items.forEach(({
                name,
                html_url
            }) => {
                console.log(`[+] ${name}: ${html_url}`);
            });
        } else {
            console.log(`No repositories found for ${username}.`);
        }
    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
}

rl.question('Enter a GitHub username: ', async (username) => {
    await main(username);
    rl.close();
});