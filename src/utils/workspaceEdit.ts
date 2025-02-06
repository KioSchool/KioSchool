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

export const getImageInfo = (selectedImages: Array<File | null>, displayImages: Array<WorkspaceImage | null>) => {
  const newImages = [...selectedImages];

  const imageIds: Array<number | null> = [];
  const imageFiles: Array<File | null> = [];

  for (let i = 0; i < 3; i++) {
    const existingImage: WorkspaceImage | { id: number; url: string; createdAt: string; updatedAt: string } | null = displayImages?.[i] || null;

    imageIds.push(existingImage ? existingImage.id : null);
    if (newImages[i]) {
      imageFiles.push(newImages[i]);
    }
  }

  return { imageIds, imageFiles };
};
