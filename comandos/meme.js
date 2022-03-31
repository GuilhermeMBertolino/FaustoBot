const puppeteer = require("puppeteer");
const { MessageEmbed } = require("discord.js");

module.exports.run = async ({Discord, client, message, args, low, FileSync, adapter, db}) => {
    const paginas = ["focanaweb__", "umpoucomaisbr", "capitaodosmemes", "ofeiobr", "kazilhoes", "stonks.br"];
    const pagina = paginas[Math.floor(Math.random() * paginas.length)];
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://instagram.com/${pagina}`);

    const imgList = await page.evaluate(() => {
        const nodeList = document.querySelectorAll("article img");
        const imgArray = [...nodeList];

        const list = imgArray.map( ({src}) => (
            {
                src
            }
        ))
        return list;
    })
    let imgNum = Math.floor(Math.random() * 12);
    let img = imgList[imgNum].src;
    let memeEmbed = new MessageEmbed()
    .setTitle(`Meme de https://instagram.com/${pagina}`)
    .setColor("#4682B4")
    .setImage(img);

    message.channel.send(memeEmbed);
}