export interface User {
  userID: number;
  name: string;
}

export interface Comment {
  text: string;
  taggedUsers: User[];
}
