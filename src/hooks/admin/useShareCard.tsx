import { toast } from 'react-toastify';

interface ShareMeta {
  title: string;
  text: string;
}

function useShareCard() {
  const share = async (imageUrl: string, meta: ShareMeta) => {
    try {
      const blob = await fetch(imageUrl).then((r) => r.blob());
      const file = new File([blob], 'kioschool-card.png', { type: 'image/png' });

      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], ...meta });
        } catch (e: any) {
          if (e?.name !== 'AbortError') {
            console.error('share error', e);
            toast.error('공유 중 문제가 발생했어요. 이미지 저장을 사용해주세요.');
          }
        }
        return;
      }
      toast.info('이 브라우저는 공유를 지원하지 않습니다. "이미지 저장"을 사용해주세요.');
    } catch (e) {
      console.error('share fetch error', e);
      toast.error('이미지를 불러오지 못했어요.');
    }
  };

  const download = async (imageUrl: string) => {
    try {
      const blob = await fetch(imageUrl).then((r) => r.blob());
      const a = document.createElement('a');
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.download = 'kioschool-card.png';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('download error', e);
      toast.error('이미지 저장에 실패했어요.');
    }
  };

  return { share, download };
}

export default useShareCard;
