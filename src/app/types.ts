export interface User {
  userID: number;
  name: string;
}

export interface Comment {
  text: string;
  taggedUsers: User[];
}

export interface Notification {
  type: 'info' | 'error' | 'success' | 'warning';
  message: string;
}
