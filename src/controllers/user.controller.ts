import UserService from '../services/user.service';
import Helper from '../db_pool/helper';
import User from '../models/user/user.model';
import FilesService from '../files/files.service';

class UserController {
  public static async getAll(request, response) {
    const userService: UserService = new UserService();

    return response.send(await userService.getAllUsers(request.query.filter, request.location));
  }

  public static async addUser(request, response) {
    const filename = await FilesService.apllyWatermark(request.file);

    const user = new User({ ...request.body, avatar: request.file.filename });
    const userService: UserService = new UserService();

    return response.send(await userService.addUser(user));
  }

  public static async matchUser(request, response) {
    const receiver = new User();
    receiver.id = parseInt(request.body.receiver.id);

    const userService: UserService = new UserService();

    return response.send(await userService.matchUsers(request.params.id, receiver.id));
  }
}

export default UserController;
