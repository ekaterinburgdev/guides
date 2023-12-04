export interface Tree {
    id:         string;
    cover:      null;
    properties: TreeProperties;
    children:   TreeChild[];
}

interface TreeChild {
    id:         string;
    cover:      string;
    properties: FluffyProperties;
    children:   ChildChild[];
}

interface ChildChild {
    id:         string;
    cover:      null;
    properties: PurpleProperties;
    children:   any[];
}

interface PurpleProperties {
    Name:    Name;
    order:   Order;
    pageUrl: URL;
}

interface Name {
    id:    TypeEnum;
    type:  TypeEnum;
    title: Title[];
}

enum TypeEnum {
    Title = "title",
}

interface Title {
    href:        null;
    text:        Text;
    type:        TitleType;
    plain_text:  string;
    annotations: Annotations;
}

interface Annotations {
    bold:          boolean;
    code:          boolean;
    color:         ColorEnum;
    italic:        boolean;
    underline:     boolean;
    strikethrough: boolean;
}

enum ColorEnum {
    Default = "default",
}

interface Text {
    link:    null;
    content: string;
}

enum TitleType {
    Text = "text",
}

interface Order {
    id:     OrderID;
    type:   OrderType;
    number: number;
}

enum OrderID {
    Cbcq = "cbcq",
    Dx3FB = "dx%3FB",
    SaHT = "SaHT",
}

enum OrderType {
    Number = "number",
}

interface URL {
    id:   PageURLID;
    url:  string;
    type: PageURLType;
}

enum PageURLID {
    CFkb = "cFkb",
    PSXB = "pSXB",
    The3Ez7DR = "%3Ez%7DR",
    VfY = "VfY_",
}

enum PageURLType {
    URL = "url",
}

interface FluffyProperties {
    pdf:            string[];
    Name:           Name;
    color:          ColorClass;
    order:          Order;
    pdfUrl:         URL;
    status:         Status;
    Created:        Created;
    pageUrl:        URL;
    subtitle:       ColorClass;
    Published:      Published;
    previewImage:   string[];
    publishedDate:  PublishedDate;
    previewPattern: string[];
}

interface Created {
    id:           string;
    type:         string;
    created_time: Date;
}

interface Published {
    id:       string;
    type:     string;
    checkbox: boolean;
}

interface ColorClass {
    id:        ColorID;
    type:      ColorType;
    rich_text: Title[];
}

enum ColorID {
    Jhb = "jhb_",
    O603E40 = "o%60%3E%40",
}

enum ColorType {
    RichText = "rich_text",
}

interface PublishedDate {
    id:   string;
    date: DateClass;
    type: string;
}

interface DateClass {
    end:       null;
    start:     Date;
    time_zone: null;
}

interface Status {
    id:     string;
    type:   string;
    select: Select | null;
}

interface Select {
    id:    string;
    name:  string;
    color: string;
}

interface TreeProperties {
    id:               string;
    type:             string;
    object:           string;
    parent:           Parent;
    archived:         boolean;
    child_page:       ChildPage;
    created_by:       TedBy;
    request_id:       string;
    created_time:     Date;
    has_children:     boolean;
    last_edited_by:   TedBy;
    last_edited_time: Date;
}

interface ChildPage {
    title: string;
}

interface TedBy {
    id:     string;
    object: string;
}

interface Parent {
    type:      string;
    workspace: boolean;
}

export interface Page {
    id: string;
    type: string;
    content: PageContent;
    children: PageChild[];
    node_properties: NodeProperties;
}

interface PageChild {
    id?: number | string;
    type: string;
    content?: FluffyContent;
    children: ChildChild[];
}

interface ChildChild {
    id: string;
    type: string;
    content: PurpleContent;
    children: any[];
}

interface PurpleContent {
    text: TextElement[];
    color: Color;
}

enum Color {
    Default = "default",
}

interface TextElement {
    href: null;
    text: TextText;
    type: Type;
    plain_text: string;
    annotations: Annotations;
}

interface Annotations {
    bold: boolean;
    code: boolean;
    color: Color;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
}

interface TextText {
    link: null;
    content: string;
}

enum Type {
    Text = "text",
}

interface FluffyContent {
    text?: TextElement[];
    color?: Color;
    is_toggleable?: boolean;
    image_data?: ImageData;
    image_name?: string;
}

interface ImageData {
    file: File;
    type: string;
    caption: any[];
}

interface File {
    url: string;
    expiry_time: Date;
}

interface PageContent {
    title: string;
}

interface NodeProperties {
    cover: null;
    properties: Properties;
}

interface Properties {
    Name: Name;
    order: Order;
    pageUrl: PageURL;
}

interface Name {
    id: string;
    type: string;
    title: TextElement[];
}

interface Order {
    id: string;
    type: string;
    number: number;
}

interface PageURL {
    id: string;
    url: string;
    type: string;
}
