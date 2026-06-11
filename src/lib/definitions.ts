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
    contentTypeName: string;
}

export type ContentTypeField = {
    id: number;
    contentTypeId: number;
    fieldName: string;
    fieldType: "string" | "number" | "datetime";
}
