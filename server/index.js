// secret_PRkpFrR7Wl03yfR85093oWlRyf1IWCykx1v6QnujNQ2
const express = require('express')
const cors = require('cors')
const {Client} = require('@notionhq/client');

const notion = new Client({
    auth: "secret_PRkpFrR7Wl03yfR85093oWlRyf1IWCykx1v6QnujNQ2"
});

const app = express()
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.get('/get-list', async (req, res) => {

    const aboba = await getList()
    res.send(aboba)
})

app.get('/page',async (req, res) => {
    const b = await getPage()
    res.send(b)
})

app.get('/block', async (req, res) => {
    const { id } = req.query

    const response = await notion.blocks.children.list({
        block_id: id,
        page_size: 50,
    });

    res.send(response)
})

app.get('/lol', async (req, res) => {
    console.log('я тут')
    res.send('kek') })

app.listen(9001)
const getPage = async () => {
    const blockId = '4abb0781ddb941d1b45f9bb16483ef1b';

    const response = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 50,
    });

    return response
}

const getContent = async (page, blockList) => {
    for (const element of page.results) {
        if (!element.has_children) {
            blockList.push({object: element.object, type: element.type, ...element[element.type]})
            continue
        }

        const response = await notion.blocks.children.list({
            block_id: element.id,
            page_size: 50,
        })

        await getContent(response, blockList)
    }
}

const getList = async () => {
    const list = []
    const page = await getPage()

    await getContent(page, list)

    // console.log('Начало')
    // const a = list.map(item => {
    //     console.log('======')
    //     console.log(item)
    //     if(item.rich_text){
    //         console.log(item.rich_text)
    //     }
    //     console.log('======')
    // })
    //
    // console.log('Конец123')

    return list
}

// getList()
