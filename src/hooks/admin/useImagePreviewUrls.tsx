import { useEffect, useState } from 'react';
import { WorkspaceImage, WorkspaceImageSlot } from '@@types/index';

function useImagePreviewUrls(slots: WorkspaceImageSlot[]) {
  const [previewUrls, setPreviewUrls] = useState<Array<string | null>>([]);

  useEffect(() => {
    const objectUrls: string[] = [];

    const urls = slots.map((slot) => {
      if (slot.image instanceof File) {
        const objectUrl = URL.createObjectURL(slot.image);
        objectUrls.push(objectUrl);
        return objectUrl;
      }

      if (slot.image) {
        return (slot.image as WorkspaceImage).url;
      }

      return null;
    });

    setPreviewUrls(urls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [slots]);

  return previewUrls;
}

export default useImagePreviewUrls;
