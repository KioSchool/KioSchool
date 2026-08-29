/** 백엔드 `FieldErrorDetail` 미러. `@Masked` 필드의 value는 redaction되어 null로 온다. */
export interface ApiFieldError {
  field: string;
  value: string | null;
  reason: string | null;
  // field가 컬렉션 항목(`positions[1].position`)을 가리킬 때 그 요소의 배열 인덱스. field 문자열을 파싱하지 않는다
  index: number | null;
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
