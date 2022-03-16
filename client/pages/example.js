import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

const superagent = require('superagent');

const GetPage = () => {
    const [ list, setList ] = React.useState([])

    React.useEffect(() => {
        const a = async () => {
            console.log('Запрос')
            const b = await superagent.get('http://localhost:9001/api/content/list?id=4abb0781ddb941d1b45f9bb16483ef1b')
            console.log('сука', b)
            setList(b.body)
            console.log('Запрос завеоршён')
        }
        a()
    }, [])

    const makeText = (richTextEl) => {

        return (
            <p style={ { fontWeight: richTextEl.annotations.bold ? 'bold' : 'normal' } }>{ richTextEl.plain_text }</p>)
    }

    const makeContentBlock = (block) => {
        if (block.type === 'file') {
            return (<img src={ block.file.url }/>)
        }

        if (block.type === 'paragraph') {
            return (<div>{ block.rich_text.map(rt => makeText(rt)) }</div>)
        }
    }

    const getLine = (columnList) => {
        if (columnList.columns.length === 2) {
            return (<div class="row">
                <div class="col">{ columnList.columns[0].columnsItems.map(col => getColumnItem(col)) }</div>
                <div class="col">{ columnList.columns[1].columnsItems.map(col => getColumnItem(col)) }</div>
            </div>)
        }

        if (columnList.columns.length === 3) {
            return (<div class="row">
                <div class="col">{ columnList.columns[0].columnsItems.map(col => getColumnItem(col)) }</div>
                <div class="col">{ columnList.columns[1].columnsItems.map(col => getColumnItem(col)) }</div>
                <div class="col">{ columnList.columns[2].columnsItems.map(col => getColumnItem(col)) }</div>
            </div>)
        }

        return <div>хз что это</div>
    }

    const getColumnItem = (columnItem) => {
        if (columnItem.type === 'image') {
            console.log('columnItem.iamge', columnItem.image)
            return (<img style={{width: '100%'}} src={ columnItem.image }/>)
        }

        if (columnItem.type === 'paragraph') {
            console.log('columnItem.paragraph', columnItem.paragraph)
            return (<p>
                { columnItem.paragraph.map(par => (<span style={ { fontWeight: par.annotations.bold ? 'bold' : 'normal'} }>{par.text.content}</span>)) }
            </p>)
        }
    }

    const parseParagraph = (paragraph) => {
        return (<p>
            { paragraph.map(par => (<span style={ { fontWeight: par.annotations.bold ? 'bold' : 'normal'} }></span>)) }
        </p>)
    }

    return (
        <div>
            { console.log(list) }
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                  crossOrigin="anonymous"/>
            {
                list.map(cl => getLine(cl))
            }
        </div>
    )
}

export default GetPage
