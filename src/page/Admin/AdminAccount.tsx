import { Fragment, useRef, useState } from 'react';

function AdminAccount() {
  const [fileURL, setFileURL] = useState<string>('');
  const [file, setFile] = useState<FileList | null>();
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

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

  const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const formData = new FormData();

    if (file) {
      formData.append('file', file[0]);
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
