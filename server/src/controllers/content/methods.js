const { Client } = require("@notionhq/client");

const notion = new Client({
    auth: "secret_PRkpFrR7Wl03yfR85093oWlRyf1IWCykx1v6QnujNQ2",
});

let LIST = null;

const getBlockApi = async (req, res) => {
    const { id } = req.query;

    const block = await getBlock(id);

    res.send(block);
};

const getClomnLists = async (req, res) => {
    const { id } = req.query;

    if (LIST) {
        res.send(LIST);
        return;
    }

    const lists = [];
    const columnLists = await getBlock(id);

    for (const columnList of columnLists.results) {
        const list = {
            columnListId: null,
            columns: [],
        };
        if (columnList.type === "column_list") {
            list.columnListId = columnList.id;
            const columns = await getBlock(columnList.id);

            for (const col of columns.results) {
                const column = {
                    columnId: null,
                    columnsItems: [],
                };
                if (col.type === "column") {
                    column.columnId = col.id;

                    const colItems = await getBlock(col.id);
                    for (const item of colItems.results) {
                        const columnItem = {
                            itemId: item.id,
                            type: item.type,
                        };
                        switch (item.type) {
                            case "image":
                                columnItem["image"] = item.image.file.url;
                                break;
                            case "paragraph":
                                columnItem["paragraph"] = item.paragraph
                                    ? item.paragraph.rich_text.map((rt) => {
                                          return {
                                              text: rt.text,
                                              annotations: rt.annotations,
                                          };
                                      })
                                    : [];
                                break;
                            default:
                                columnItem["idontknow"] = item;
                        }
                        column.columnsItems.push(columnItem);
                    }
                }
                list.columns.push(column);
            }
        } else {
            console.log("columnList.rich_text", columnList.rich_text);
        }
        lists.push(list);
    }

    LIST = lists;
    res.send(lists);
};

const getBlock = async (id) => {
    const response = await notion.blocks.children.list({
        block_id: id,
        page_size: 50,
    });

    return response;
};

exports.getBlockApi = getBlockApi;
exports.getClomnLists = getClomnLists;
