
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}));
app.post('/generate', async function(req, res) {
    const Jimp = require('jimp');
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

    const image = await Jimp.read(__dirname + `/assets/${parseInt(req.body.design || 1)}.png`);
    let x = 0;
    let y = 0;
    for(let i = 0; i < 25; i++){
        if(i !== 12){
            image.print(font, 190 + x*230, 530 + y*230 , `${req.body.text[i] || ''}`, 150);
        }
        x++;
        if(x === 5){
            y++;
            x=0;
        }
    }
    await image.writeAsync(__dirname + `/generated/${req.query.name}.png`)
    res.sendFile(__dirname + `/generated/${req.query.name}.png`);
}); 

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 3005, () => {
})