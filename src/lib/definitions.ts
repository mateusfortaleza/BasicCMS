export type HeroCardForm = {
    id: string,
    backgroundImage: string, 
    overlayColor: string, 
    title: string, 
    link: string
}

export type MenuItems = {
    id: number,
    svg_url: string;
    menuText: string;
    menuLink: string;
}

export type Language = {
    id: string;
    language: string;
    langCode: string;
}

export type ContentType = {
    id: number;
    contentTypeId: string;
    contentTypeName: string;
}

export type ContentTypeField = {
    id: number;
    contentTypeId: string;
    fieldName: string;
    fieldType: "string" | "number" | "datetime" | "image" | "rich-text";
}

export type Content = {
    id: number;
    contentTypeId: string;
    name: string;
}

export type ContentField = {
    id: number;
    contentId: number;
    contentTypeFieldId: number;
    value: string;
}
