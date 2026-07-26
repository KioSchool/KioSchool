/**
 * 백엔드 `ErrorCode` enum(KioSchool-API #17) 미러.
 *
 * 백엔드는 모든 에러 응답 바디에 기계 판독용 `code`를 담아 내려준다.
 * - 비즈니스 예외 → 아래 enum 이름 (`NOT_SELLABLE_PRODUCT` 등)
 * - Spring MVC 프레임워크 예외 → HTTP status 이름 (415 → `UNSUPPORTED_MEDIA_TYPE` 등)
 *
 * 따라서 여기 없는 code는 프레임워크나 게이트웨이가 만든 것이며, 곧 프론트 요청
 * 자체가 잘못됐다는 신호다. 주석의 숫자는 함께 내려오는 HTTP status로, 참고용이며
 * 프론트 분기에는 쓰지 않는다. (status 하나에 성격이 다른 code가 겹치기 때문)
 */
export const API_ERROR_CODES = {
  // Common
  INVALID_INPUT: 'INVALID_INPUT', // 400
  INTERNAL_ERROR: 'INTERNAL_ERROR', // 500

  // User
  USER_NOT_FOUND: 'USER_NOT_FOUND', // 404
  LOGIN_FAILED: 'LOGIN_FAILED', // 401
  NO_PERMISSION: 'NO_PERMISSION', // 401
  DUPLICATE_LOGIN_ID: 'DUPLICATE_LOGIN_ID', // 400
  DUPLICATE_EMAIL: 'DUPLICATE_EMAIL', // 400
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED', // 400

  // Workspace
  WORKSPACE_INACCESSIBLE: 'WORKSPACE_INACCESSIBLE', // 405
  WORKSPACE_NOT_FOUND: 'WORKSPACE_NOT_FOUND', // 404
  WORKSPACE_TABLE_NOT_FOUND: 'WORKSPACE_TABLE_NOT_FOUND', // 404
  NO_PERMISSION_TO_CREATE_WORKSPACE: 'NO_PERMISSION_TO_CREATE_WORKSPACE', // 401
  NO_PERMISSION_TO_INVITE: 'NO_PERMISSION_TO_INVITE', // 403
  NO_PERMISSION_TO_JOIN_WORKSPACE: 'NO_PERMISSION_TO_JOIN_WORKSPACE', // 403
  SUPER_ADMIN_WORKSPACE_READ_ONLY: 'SUPER_ADMIN_WORKSPACE_READ_ONLY', // 400

  // Product
  NOT_FOUND_PRODUCT: 'NOT_FOUND_PRODUCT', // 404
  NOT_SELLABLE_PRODUCT: 'NOT_SELLABLE_PRODUCT', // 406
  CANNOT_DELETE_USING_PRODUCT_CATEGORY: 'CANNOT_DELETE_USING_PRODUCT_CATEGORY', // 405

  // Order
  EMPTY_ORDER_SESSION: 'EMPTY_ORDER_SESSION', // 400
  NO_ORDER_SESSION: 'NO_ORDER_SESSION', // 400
  ORDER_SESSION_ALREADY_EXIST: 'ORDER_SESSION_ALREADY_EXIST', // 400
  TABLE_HASH_IS_NULL: 'TABLE_HASH_IS_NULL', // 400

  // Account / Toss
  BANK_NOT_FOUND: 'BANK_NOT_FOUND', // 404
  BANK_TOSS_NAME_NOT_FOUND: 'BANK_TOSS_NAME_NOT_FOUND', // 400
  INCORRECT_ACCOUNT_HOLDER: 'INCORRECT_ACCOUNT_HOLDER', // 404
  DIFFERENT_ACCOUNT_NUMBER: 'DIFFERENT_ACCOUNT_NUMBER', // 400

  // Email
  DUPLICATE_EMAIL_DOMAIN: 'DUPLICATE_EMAIL_DOMAIN', // 400
  NOT_VERIFIED_EMAIL_DOMAIN: 'NOT_VERIFIED_EMAIL_DOMAIN', // 422
  EMAIL_SEND_FAILURE: 'EMAIL_SEND_FAILURE', // 500

  // Security
  INVALID_JWT: 'INVALID_JWT', // 401
} as const;

export type ApiErrorCode = typeof API_ERROR_CODES[keyof typeof API_ERROR_CODES];

/**
 * 세션 자체가 무효임을 뜻하는 code. 글로벌 로그아웃 이벤트를 발행한다.
 *
 * `INVALID_JWT`는 토큰은 유효하나 해당 사용자가 삭제된 경우로, JWT 필터가
 * `HandlerExceptionResolver`에 위임해 advice까지 도달하므로 code가 붙는다.
 */
export const SESSION_INVALID_ERROR_CODES: readonly ApiErrorCode[] = [API_ERROR_CODES.INVALID_JWT];

/**
 * code 없이 세션 무효로 판단할 status.
 *
 * 쿠키 만료·토큰 부재처럼 인증 정보가 아예 없으면 JWT 필터는 예외를 던지지 않고
 * 그냥 통과시킨다. 이후 Spring Security의 `ExceptionTranslationFilter`가
 * `@RestControllerAdvice`를 **우회해** 빈 바디로 거부하므로 응답에 `code`가 없다.
 * 세션 만료의 대부분이 이 경로이며, 백엔드 배포 여부와 무관하게 계속 유효하다.
 */
export const SESSION_REJECTED_STATUSES: readonly number[] = [401, 403];
