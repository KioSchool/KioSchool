import { Ref } from 'react';
import AppButton from '../button/AppButton';
import AppInputWithLabel from '../input/AppInputWithLabel';
interface Props {
  workspaceDescriptionRef: Ref<HTMLInputElement>;
  workspaceNameRef: Ref<HTMLInputElement>;
}
function AddWorkspaceModalContent({ workspaceDescriptionRef, workspaceNameRef }: Props) {
  return (
    <>
      <AppInputWithLabel titleLabel={'주점 이름'} style={{ marginBottom: '25px' }} type={'text'} id={'workspaceName'} ref={workspaceNameRef} />
      <AppInputWithLabel titleLabel={'주점 설명'} style={{ marginBottom: '20px' }} type={'text'} id={'workspaceDescription'} ref={workspaceDescriptionRef} />
      <AppButton size={'large'} style={{ marginTop: '15px' }} type={'submit'}>
        생성하기
      </AppButton>
    </>
  );
}
export default AddWorkspaceModalContent;
