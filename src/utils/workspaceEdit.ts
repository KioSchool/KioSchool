import { WorkspaceImage } from '@@types/index';

export const removeAndPushNull = <T>(array: (T | null)[], index: number): (T | null)[] => {
  const updatedItems = [...array];
  updatedItems.splice(index, 1);
  updatedItems.push(null);
  return updatedItems;
};

export const initWorkspaceImages = (workspaceImages: Array<WorkspaceImage | null>) => {
  const images: Array<WorkspaceImage | null> = [...workspaceImages];
  while (images.length < 3) {
    images.push(null);
  }
  return images;
};

export const extractImageIdsAndFiles = (displayImages: Array<WorkspaceImage | File | null>) => {
  const imageIds: Array<number | null> = [];
  const imageFiles: Array<File | null> = [];

  for (let i = 0; i < 3; i++) {
    const image = displayImages[i] ?? null;

    const isFile = image instanceof File;

    if (isFile) {
      imageIds.push(null);
      imageFiles.push(image);
    } else if (image) {
      imageIds.push(image.id);
      imageFiles.push(null);
    } else {
      imageIds.push(null);
      imageFiles.push(null);
    }
  }

  return { imageIds, imageFiles };
};
