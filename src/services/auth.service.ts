import { AuthUtil } from '../utils/auth.util';
import { AuthTokenError } from '../errors/custom-errors';
import { UsersRepository } from '../repositories/users.repository';

export class AuthService {
  constructor(private readonly userRepository: UsersRepository) {}

  async login(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findByUsername(username);

    if (user) {
      // throw new NotFoundError('User not found');
      const isValidPassword = await AuthUtil.validatePassword(password, user.password);

      if (!isValidPassword) {
        throw new AuthTokenError('Invalid credentials');
      }

      // early return if user is found and password is valid
      return AuthUtil.generateToken(user.id, username);
    }

    // instead of throwing error, we create a new user
    const hashedPassword = await AuthUtil.hashPassword(password);

    const newUser = await this.userRepository.create({
      username,
      password: hashedPassword,
    });

    return AuthUtil.generateToken(newUser.id, username);
  }
}
