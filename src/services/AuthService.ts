export const AuthService = {
  users: [
    { name: 'Іван', email: 'ivan@example.com', password: 'password123' },
    { name: 'Марія', email: 'maria@example.com', password: 'securepass' },
  ],

  register(data: { name: string; email: string; password: string }) {
    return new Promise<{ message: string }>((resolve, reject) => {
      setTimeout(() => {
        const userExists = AuthService.users.some((user) => user.email === data.email);
        if (userExists) {
          reject(new Error('Користувач з таким email вже існує'));
        } else {
          AuthService.users.push(data);
          resolve({ message: 'Реєстрація успішна!' });
        }
      }, 1000);
    });
  },
};
