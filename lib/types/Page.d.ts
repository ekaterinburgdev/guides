export interface Page {
    id: string
    type: string
    content: PageContent
    children: PageChild[]
    node_properties: NodeProperties
}

interface PageChild {
    id?: number | string
    type: string
    content?: FluffyContent
    children: ChildChild[]
}

interface ChildChild {
    id: string
    type: string
    content: PurpleContent
    children: any[]
}

interface PurpleContent {
    text: TextElement[]
    color: string
}

interface TextElement {
    href: null
    text: TextText
    type: string
    plain_text: string
    annotations: Annotations
}

interface Annotations {
    bold: boolean
    code: boolean
    color: Color
    italic: boolean
    underline: boolean
    strikethrough: boolean
}

interface TextText {
    link: null
    content: string
}

interface FluffyContent {
    text?: TextElement[]
    color?: Color
    is_toggleable?: boolean
    image_data?: ImageData
    image_name?: string
}

interface ImageData {
    file: File
    type: string
    caption: any[]
}

interface File {
    url: string
    expiry_time: Date
}

interface PageContent {
    title: string
}

interface NodeProperties {
    cover: null
    properties: Properties
}

interface Properties {
    Name: Name
    order: Order
    pageUrl: PageURL
}

interface Name {
    id: string
    type: string
    title: TextElement[]
}

interface Order {
    id: string
    type: string
    number: number
}

interface PageURL {
    id: string
    url: string
    type: string
}
