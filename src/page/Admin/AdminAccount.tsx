import { useRef, useState } from 'react';
import jsQR from 'jsqr';
import useAdminUser from '../../hook/useAdminUser';

function AdminAccount() {
  const { addAccount } = useAdminUser();
  const [fileURL, setFileURL] = useState<string>('');
  const [file, setFile] = useState<FileList | null>();
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      setFileURL('');
      return;
    }

    const newFileURL = URL.createObjectURL(event.target.files[0]);

    setFile(event.target.files);
    setFileURL(newFileURL);
    imgUploadInput.current?.click();
  };

  const removeImage = (): void => {
    URL.revokeObjectURL(fileURL);
    setFileURL('');
    setFile(null);
  };

  const removeUsingRegex = (url: string): string => {
    const regex = new RegExp(/&?amount=\d+&?/g);
    return url.replace(regex, '');
  };

  const submitHandler = async () => {
    if (!file) {
      alert('업로드할 이미지가 없습니다');
      return;
    }

    const image = new Image();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    image.src = fileURL;

    image.onload = () => {
      if (!context) return;

      canvas.width = image.width;
      canvas.height = image.height;

      context.drawImage(image, 0, 0, image.width, image.height);

      const imageData = context.getImageData(0, 0, image.width, image.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (!code) {
        alert('QR코드가 인식되지 않았습니다.\n다시 업로드 바랍니다.');
        return;
      }

      const decodedUrl: string = code.data;
      const url = removeUsingRegex(decodedUrl);
      addAccount(url);
    };
  };

  return (
    <div>
      <div>ADD ACCOUNT</div>;
      <img src={fileURL || 'src\resourcedefault-image.png'} />
      <input type="file" id="img" accept="image/*" required ref={imgUploadInput} onChange={onImageChange} />
      <button type="button" onClick={removeImage}>
        제거 버튼
      </button>
      <button onClick={submitHandler}>submit</button>
    </div>
  );
}

export default AdminAccount;
