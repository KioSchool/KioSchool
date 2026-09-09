import { FocalPoint, WorkspaceImage, WorkspaceImageSlot } from '@@types/index';
import { DEFAULT_FOCAL_POINT, WORKSPACE_IMAGE_SLOT_COUNT } from '@constants/data/workspaceImageData';

const emptySlot = (): WorkspaceImageSlot => ({ image: null, focalPoint: DEFAULT_FOCAL_POINT });

export const removeAndPushEmpty = (slots: WorkspaceImageSlot[], index: number): WorkspaceImageSlot[] => {
  const updatedSlots = [...slots];
  updatedSlots.splice(index, 1);
  updatedSlots.push(emptySlot());
  return updatedSlots;
};

export const initWorkspaceImageSlots = (workspaceImages: Array<WorkspaceImage>): WorkspaceImageSlot[] => {
  // adminWorkspaceAtom은 localStorage에 영속화된다. 이 기능 배포 전에 캐시된 워크스페이스는
  // focalPoint 필드 자체가 없어 undefined로 들어오므로, 초기화 시점에 기본값으로 보정한다.
  const slots: WorkspaceImageSlot[] = workspaceImages.map((image) => ({
    image,
    focalPoint: image.focalPoint ?? DEFAULT_FOCAL_POINT,
  }));

  while (slots.length < WORKSPACE_IMAGE_SLOT_COUNT) {
    slots.push(emptySlot());
  }

  return slots;
};

export const setSlotImage = (slots: WorkspaceImageSlot[], index: number, image: File): WorkspaceImageSlot[] => {
  const updatedSlots = [...slots];
  updatedSlots[index] = { image, focalPoint: DEFAULT_FOCAL_POINT };
  return updatedSlots;
};

export const setSlotFocalPoint = (slots: WorkspaceImageSlot[], index: number, focalPoint: FocalPoint): WorkspaceImageSlot[] => {
  const updatedSlots = [...slots];
  updatedSlots[index] = { ...updatedSlots[index], focalPoint };
  return updatedSlots;
};

/**
 * imageFiles는 multipart라 null을 담을 수 없어 파일만 골라 보낸다. 서버는 빈 슬롯이 항상
 * 뒤쪽에 몰려 있다는 전제로 슬롯과 파일을 다시 맞추므로, 이 순서를 깨뜨리면 안 된다.
 * 호출부가 이 전제를 깨고 중간에 빈 슬롯이 낀 배열을 넘기더라도 페이로드가 잘못 직렬화되지
 * 않도록, 여기서 채워진 슬롯을 앞으로 모아 방어적으로 재정렬한 뒤 사용한다.
 */
export const extractImageSlotPayload = (slots: WorkspaceImageSlot[]) => {
  const compactedSlots = slots.filter((slot) => slot.image).concat(slots.filter((slot) => !slot.image));

  const imageIds: Array<number | null> = [];
  const imageFiles: Array<File> = [];
  const focalPoints: Array<FocalPoint> = [];

  for (let i = 0; i < WORKSPACE_IMAGE_SLOT_COUNT; i++) {
    const slot = compactedSlots[i] ?? emptySlot();

    focalPoints.push(slot.focalPoint);

    if (slot.image instanceof File) {
      imageIds.push(null);
      imageFiles.push(slot.image);
    } else if (slot.image) {
      imageIds.push(slot.image.id);
    } else {
      imageIds.push(null);
    }
  }

  return { imageIds, imageFiles, focalPoints };
};
