import { Fragment, useRef, useState } from 'react';
import jsQR from 'jsqr';
import useAdminUser from '../../hook/useAdminUser';

function AdminAccount() {
  const [fileURL, setFileURL] = useState<string>('');
  const [file, setFile] = useState<FileList | null>();
  const imgUploadInput = useRef<HTMLInputElement | null>(null);
  const { addAccount } = useAdminUser();
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files);

      const newFileURL = URL.createObjectURL(event.target.files[0]);
      setFileURL(newFileURL);
    }
  };

  const onImageRemove = (): void => {
    URL.revokeObjectURL(fileURL);
    setFileURL('');
    setFile(null);
  };

  const applyRegex = (url: string): string => {
    const regex = new RegExp(/&?amount=\d+&?/g);
    return url.replace(regex, '');
  };

  const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (file) {
      const image = new Image();
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        if (context) {
          context.drawImage(image, 0, 0, image.width, image.height);

          const imageData = context.getImageData(0, 0, image.width, image.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            const decodedUrl: string = code.data;
            const url = applyRegex(decodedUrl);
            addAccount(url);
          }
        }
      };

      image.src = fileURL;
    } else {
      alert('업로드할 이미지가 없습니다');
    }
  };

  return (
    <Fragment>
      <div>ADD ACCOUNT</div>;
      <img src={fileURL ? fileURL : 'https://cdn-icons-png.flaticon.com/512/1555/1555492.png'} />
      <input type="file" id="img" accept="image/*" required ref={imgUploadInput} onChange={onImageChange} />
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          if (imgUploadInput.current) {
            imgUploadInput.current.click();
          }
        }}
      >
        이미지 변경 버튼
      </button>
      <button type="button" onClick={onImageRemove}>
        제거 버튼
      </button>
      <button onClick={submitHandler}>submit</button>
    </Fragment>
  );
}

export default AdminAccount;
