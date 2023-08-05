import {Publisher} from "./publisher.interface";

export interface Hero {
  id: string;
  superhero: string;
  publisher: Publisher;
  alterEgo: string;
  firstAppearance: string;
  characters: string;
  altImage?: string;
  description: string;
}
