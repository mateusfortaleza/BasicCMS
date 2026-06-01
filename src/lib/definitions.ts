export type HeroCardForm = {
    id: number,
    backgroundImage: string, 
    overlayColor: string, 
    title: string, 
    link: string
}

export type MenuItems = {
    id: number,
    icon: string;
    menuText: string;
    menuLink: string;
}

export type Language = {
    id: string;
    language: string;
    langCode: string;
}
