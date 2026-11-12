import { lazy, Suspense } from 'react';
import type { MailEditorProps } from './MailEditor';

// 슈퍼어드민에서만 쓰는 편집기 라이브러리가 손님 화면 번들에 섞이지 않게 따로 불러온다
const MailEditor = lazy(() => import('./MailEditor'));

function LazyMailEditor(props: MailEditorProps) {
  return (
    <Suspense fallback={null}>
      <MailEditor {...props} />
    </Suspense>
  );
}

export default LazyMailEditor;
