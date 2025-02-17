export interface Todo {
  _id: string;
  category: string;
  description?: string;
  completed: boolean;
}

export type TodoCategory = 'software design' | 'video games' | 'homework' | 'groceries';
