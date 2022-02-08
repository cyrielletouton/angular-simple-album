export class Post {
  id!: number;
  title!: string;
  description!: string;
  picture!: string;
}

export class User {
  id!: number;
  login!: string;
}

// Permet de décrire la réponse envoyée par le serveur suite à la requête login
export interface TokenUserPayload {
  token: string;
  user: User;
}