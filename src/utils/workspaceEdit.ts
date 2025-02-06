import { WorkspaceImage } from '@@types/index';

export const removeAndPushNull = <T>(array: (T | null)[], index: number): (T | null)[] => {
  const newArray = [...array];
  newArray.splice(index, 1);
  newArray.push(null);
  return newArray;
};

export const initWorkspaceImages = (workspaceImages: Array<WorkspaceImage | null>) => {
  const images: Array<WorkspaceImage | null> = [...workspaceImages];
  while (images.length < 3) {
    images.push(null);
  }
  return images;
};

export const getImageInfo = (displayImages: Array<WorkspaceImage | File | null>) => {
  const imageIds: Array<number | null> = [];
  const imageFiles: Array<File | null> = [];

  for (let i = 0; i < 3; i++) {
    const item = displayImages[i] ?? null;

    if (item instanceof File) {
      imageFiles.push(item);
      imageIds.push(null);
    } else if (item !== null) {
      imageIds.push(item.id);
      imageFiles.push(null);
    } else {
      imageIds.push(null);
      imageFiles.push(null);
    }
  }

  return { imageIds, imageFiles };
};
