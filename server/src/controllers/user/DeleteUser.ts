import { HttpRequest } from '../../protocols/HttpRequest';
import { HttpResponse } from '../../protocols/HttpResponse';
import { UserRepository } from '../../repositories/User';
import { ControllerValidator } from '../../validators/Base';
import { BaseAssertiveController } from '../BaseAssertive';

export class DeleteUserController extends BaseAssertiveController {
  private userRepository: UserRepository;

  constructor(validator: ControllerValidator, repository: UserRepository) {
    super(validator);
    this.userRepository = repository;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { userId } = request.params;
    const user = await this.userRepository.read(userId);
    user.softDelete = true;
    const timestamp = new Date().getTime();
    user.email = `${timestamp}_DELETED_${user.email}`;
    await this.userRepository.update(user);
    return {
      statusCode: 200,
      body: user.softDelete,
    };
  }
}
