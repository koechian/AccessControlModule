import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLogin } from './dto/user-login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

type SignInData = { userid: string; username: string; role: string };
type AuthResult = {
  accessToken: string;
  userid: string;
  username: string;
  role: string;
};

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: UserLogin): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Generate the JWT token if the user is valid and return the auth Object
    return await this.signIn(user);
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const token = await this.jwtService.signAsync({
      sub: user.userid,
      username: user.username,
      role: user.role,
    });

    return {
      accessToken: token,
      userid: user.userid,
      username: user.username,
      role: user.role,
    };
  }

  async validateUser(input: UserLogin): Promise<SignInData | null> {
    const user = await this.users.findOne(input.username);
    if (user[0] && argon.verify(user[0].password, input.password)) {
      return {
        userid: user[0].userid,
        username: input.username,
        role: user[0].role,
      };
    }
    return null;
  }
}
