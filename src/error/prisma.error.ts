import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
export function throwPrismaError(error: PrismaClientKnownRequestError){
    switch (error.code) {
        case 'P2002':
          // 데이터베이스 연결 오류
          console.error('Database connection error:', error);
          throw new InternalServerErrorException('Database connection error');
        case 'P2004':
          // 외래키 제약 위반
          throw new BadRequestException('Foreign key constraint violation');
        case 'P2005':
          // 데이터베이스 트랜잭션 오류
          console.error('Database transaction error:', error);
          throw new InternalServerErrorException('Database transaction error');
        case 'P2006':
          // 데이터베이스 쿼리 오류
          console.error('Database query error:', error);
          throw new InternalServerErrorException('Database query error');
        case 'P2007':
          // 데이터베이스 스키마 오류
          console.error('Database schema error:', error);
          throw new InternalServerErrorException('Database schema error');
        case 'P2008':
          // 데이터베이스 연결 종료
          console.error('Database connection closed:', error);
          throw new InternalServerErrorException('Database connection closed');
        case 'P2009':
          // 데이터베이스 쿼리 취소
          console.error('Database query cancelled:', error);
          throw new InternalServerErrorException('Database query cancelled');
        case 'P2010':
          // 데이터베이스 연결 시간 초과
          console.error('Database connection timeout:', error);
          throw new InternalServerErrorException('Database connection timeout');
        case 'P2011':
          // 데이터베이스 쿼리 실행 시간 초과
          console.error('Database query execution timeout:', error);
          throw new InternalServerErrorException('Database query execution timeout');
        case 'P2012':
          // 데이터베이스 서버 오류
          console.error('Database server error:', error);
          throw new InternalServerErrorException('Database server error');
        case 'P2013':
          // 데이터베이스 트랜잭션 롤백 오류
          console.error('Database transaction rollback error:', error);
          throw new InternalServerErrorException('Database transaction rollback error');
        case 'P2014':
          // 데이터베이스 연결 풀 오류
          console.error('Database connection pool error:', error);
          throw new InternalServerErrorException('Database connection pool error');
        case 'P2015':
          // 데이터베이스 연결 획득 오류
          console.error('Database connection acquire error:', error);
          throw new InternalServerErrorException('Database connection acquire error');
        case 'P2016':
          // 데이터베이스 연결 리소스 부족
          console.error('Database connection resource shortage:', error);
          throw new InternalServerErrorException('Database connection resource shortage');
        default:
          // 예상치 못한 오류
          console.error('Unhandled PrismaClientKnownRequestError:', error);
          throw new InternalServerErrorException('Unhandled error');
    }
}