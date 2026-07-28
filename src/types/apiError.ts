/** 백엔드 `FieldErrorDetail` 미러. `@Masked` 필드의 value는 redaction되어 null로 온다. */
export interface ApiFieldError {
  field: string;
  value: string | null;
  reason: string | null;
}

/** 백엔드 `ErrorResponse` 미러. 모든 에러 응답이 이 형태를 갖는다. */
export interface ApiErrorBody {
  code: string;
  message: string;
  status: number;
  path: string;
  timestamp: string;
  errors?: ApiFieldError[];
}
