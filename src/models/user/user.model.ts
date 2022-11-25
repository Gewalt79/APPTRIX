import Helper from '../../helpers/helper';

class User {
  public id: number | undefined = undefined;
  public avatar: string | undefined = undefined;
  public firstName: string | undefined = undefined;
  public lastName: string | undefined = undefined;
  public email: string | undefined = undefined;
  public gender: 'male' | 'female' | undefined = undefined;
  public password: string | undefined = undefined;
  public latitude: number | undefined = undefined;
  public longitude: number | undefined = undefined;

  constructor(model?: any) {
    if (model) {
      Helper.shallowCopy(model, this);
    }
  }
}

export default User;
