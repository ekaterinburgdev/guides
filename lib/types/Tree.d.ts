export interface Tree {
    id: string
    cover: null
    properties: TreeProperties
    children: TreeChild[]
}

interface TreeChild {
    id: string
    cover: string
    properties: FluffyProperties
    children: ChildChild[]
}

interface ChildChild {
    id: string
    cover: null
    properties: PurpleProperties
    children: any[]
}

interface PurpleProperties {
    Name: Name
    order: Order
    pageUrl: URL
}

interface Name {
    id: string
    type: string
    title: Title[]
}

interface Title {
    href: null
    text: Text
    type: string
    plain_text: string
    annotations: Annotations
}

interface Annotations {
    bold: boolean
    code: boolean
    color: string
    italic: boolean
    underline: boolean
    strikethrough: boolean
}

interface Text {
    link: null
    content: string
}

interface Order {
    id: string
    type: string
    number: number
}

interface URL {
    id: string
    url: string
    type: string
}

interface FluffyProperties {
    pdf: string[]
    Name: Name
    color: ColorClass
    order: Order
    pdfUrl: URL
    status: Status
    Created: Created
    pageUrl: URL
    subtitle: ColorClass
    Published: Published
    previewImage: string[]
    publishedDate: PublishedDate
    previewPattern: string[]
}

interface Created {
    id: string
    type: string
    created_time: Date
}

interface Published {
    id: string
    type: string
    checkbox: boolean
}

interface ColorClass {
    id: string
    type: string
    rich_text: Title[]
}

interface PublishedDate {
    id: string
    date: DateClass
    type: string
}

interface DateClass {
    end: null
    start: Date
    time_zone: null
}

interface Status {
    id: string
    type: string
    select: Select | null
}

interface Select {
    id: string
    name: string
    color: string
}

interface TreeProperties {
    id: string
    type: string
    object: string
    parent: Parent
    archived: boolean
    child_page: ChildPage
    created_by: TedBy
    request_id: string
    created_time: Date
    has_children: boolean
    last_edited_by: TedBy
    last_edited_time: Date
}

interface ChildPage {
    title: string
}

interface TedBy {
    id: string
    object: string
}

interface Parent {
    type: string
    workspace: boolean
}
