export const userService = {
  createUser: async (userData: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check for existing user
      if (users.some((u: any) => u.email === userData.email)) {
        throw new Error('Email already registered');
      }

      const newUser = {
        id: Date.now(),
        ...userData
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      return newUser;
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  },

  getUsers: () => {
    return JSON.parse(localStorage.getItem('users') || '[]');
  },

  getUserByEmail: (email: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find((u: any) => u.email === email);
  }
}; 