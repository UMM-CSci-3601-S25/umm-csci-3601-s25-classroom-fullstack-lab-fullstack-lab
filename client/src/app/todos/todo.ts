export interface Todo {
  _id: string;
  owner: string;
  body: string
  status:boolean;
  category: string;
}

export type TodoCategory = 'homework' | 'video games' | 'groceries' | 'software design';
