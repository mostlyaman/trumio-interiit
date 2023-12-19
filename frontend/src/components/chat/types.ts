interface MasterAIChat {
  id: string,
  type: 'user' | 'system' | 'resource' | 'milestone' | 'payment',
  data: string,
  user: {
    name: string, 
    profilePicture: string
  }
  created_at: string
}

interface UpdateChat {
  id: string,
  data: {
    title: string,
    completed: boolean
  }[],
  created_at: string
}

export type {
  MasterAIChat,
  UpdateChat
}