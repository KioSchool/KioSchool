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
  // Initialize arrays to hold IDs and files.
  // Here, we’re filling in a placeholder (null) if no valid value is present.
  const imageIds: Array<number | null> = [];
  const imageFiles: Array<File | null> = [];

  // Loop through the first three images.
  for (let i = 0; i < 3; i++) {
    const item = displayImages[i] ?? null;

    if (item instanceof File) {
      // If the item is a File, push the file and push null for the id.
      imageFiles.push(item);
      imageIds.push(null);
    } else if (item !== null) {
      // If the item is not null and not a File, assume it’s a WorkspaceImage.
      // (If you have more types, you may need to adjust the type guard accordingly.)
      imageIds.push(item.id);
      imageFiles.push(null);
    } else {
      // If the item is null, push nulls in both arrays.
      imageIds.push(null);
      imageFiles.push(null);
    }
  }

  return { imageIds, imageFiles };
};
