import { BadGatewayException, BadRequestException, ConflictException, ForbiddenException, GatewayTimeoutException, GoneException, HttpException, HttpStatus, HttpVersionNotSupportedException, ImATeapotException, InternalServerErrorException, MethodNotAllowedException, NotAcceptableException, NotFoundException, NotImplementedException, PayloadTooLargeException, PreconditionFailedException, RequestTimeoutException, ServiceUnavailableException, UnauthorizedException, UnprocessableEntityException, UnsupportedMediaTypeException } from "@nestjs/common";

export function throwErrorHttp(error: Error) {
    if (error instanceof BadRequestException)
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    else if (error instanceof UnauthorizedException)
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    else if (error instanceof NotFoundException)
        throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    else if (error instanceof ForbiddenException)
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    else if (error instanceof NotAcceptableException)
        throw new HttpException('NotAcceptable', HttpStatus.NOT_ACCEPTABLE);
    else if (error instanceof RequestTimeoutException)
        throw new HttpException('RequestTimeout', HttpStatus.REQUEST_TIMEOUT);
    else if (error instanceof ConflictException)
        throw new HttpException('Conflict', HttpStatus.CONFLICT);
    else if (error instanceof GoneException)
        throw new HttpException('Gone', HttpStatus.GONE);
    else if (error instanceof HttpVersionNotSupportedException)
        throw new HttpException('HttpVersionNotSupported', HttpStatus.HTTP_VERSION_NOT_SUPPORTED);
    else if (error instanceof PayloadTooLargeException)
        throw new HttpException('PayloadTooLarge', HttpStatus.PAYLOAD_TOO_LARGE);
    else if (error instanceof UnsupportedMediaTypeException)
        throw new HttpException('UnsupportedMediaType', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    else if (error instanceof UnprocessableEntityException)
        throw new HttpException('UnprocessableEntity', HttpStatus.UNPROCESSABLE_ENTITY);
    else if (error instanceof InternalServerErrorException)
        throw new HttpException('InternalServerError', HttpStatus.INTERNAL_SERVER_ERROR);
    else if (error instanceof NotImplementedException)
        throw new HttpException('NotImplemented', HttpStatus.NOT_IMPLEMENTED);
    else if (error instanceof ImATeapotException)
        throw new HttpException('ImATeapot', HttpStatus.I_AM_A_TEAPOT);
    else if (error instanceof MethodNotAllowedException)
        throw new HttpException('MethodNotAllowed', HttpStatus.METHOD_NOT_ALLOWED);
    else if (error instanceof BadGatewayException)
        throw new HttpException('BadGateway', HttpStatus.BAD_GATEWAY);
    else if (error instanceof ServiceUnavailableException)
        throw new HttpException('ServiceUnavailable', HttpStatus.SERVICE_UNAVAILABLE);
    else if (error instanceof GatewayTimeoutException)
        throw new HttpException('GatewayTimeout', HttpStatus.GATEWAY_TIMEOUT);
    else if (error instanceof PreconditionFailedException)
        throw new HttpException('PreconditionFailed', HttpStatus.PRECONDITION_FAILED);
    else{
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}