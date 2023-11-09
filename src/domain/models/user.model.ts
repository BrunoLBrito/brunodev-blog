class UserModel {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly updated_at: string,
    public readonly created_at: string
  ) {}
}

export { UserModel }
