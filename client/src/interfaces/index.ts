export interface Tag {
  id?: number;
  name: string;
}

export interface Image {
  name: string;
  url: string;
  id?: number;
  tags: Omit<Tag, "images">[];
}

export interface FilesUploaded {
  filename: string;
  handle: string;
  mimetype: string;
  originalPath: string;
  size: number;
  source: string;
  url: string;
  uploadId: string;
  status: string;
}

export interface RootFileObj {
  filesUploaded: FilesUploaded[];
  filesFailed: any[];
}
