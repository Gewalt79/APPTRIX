import jwt from 'jsonwebtoken';
import UserService from '../services/user.service';

class CheckAuth {
  public async check(request, response, next, permission: string) {
    const token = request.headers.authorization?.split(' ')[1];

    const verifiedToken = UserService.verifyToken(token);

    if (!verifiedToken.success) {
      return response.send({
        success: false,
        data: { message: 'Invalid Token' },
      });
    }

    const email = verifiedToken.tokenBody.email;

    const permissions = verifiedToken.tokenBody?.permissions;

    if (permissions && permissions.includes(permission)) {
      request.location = {
        latitude: verifiedToken.tokenBody.lat,
        longitude: verifiedToken.tokenBody.lon,
      };
      return next();
    } else {
      return response.send({
        success: false,
        data: { message: 'Out of user scope' },
      });
    }
  }
}

export default new CheckAuth();
