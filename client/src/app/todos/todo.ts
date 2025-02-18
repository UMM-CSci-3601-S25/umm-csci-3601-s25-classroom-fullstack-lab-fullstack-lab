export interface Todo {
  _id: string;
  category: TodoCategory;
  body: string;
  status: boolean;
  owner: string;
}

export type TodoCategory = 'software design' | 'video games' | 'homework' | 'groceries';
