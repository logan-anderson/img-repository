export interface Tag {
    id?: number,
    name: string
    images: Omit<Image, "tags">[]
}

export interface Image {
    name: string,
    url: string,
    id?: number,
    tags: Omit<Tag, "images">[]
}
