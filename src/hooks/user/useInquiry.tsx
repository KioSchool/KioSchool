import { CreateInquiryRequest, CreateInquiryResponse } from '@@types/inquiry';
import useApi from '@hooks/useApi';

function useInquiry() {
  const { userApi } = useApi();

  const createInquiry = async (request: CreateInquiryRequest, imageFiles: File[]): Promise<CreateInquiryResponse> => {
    const formData = new FormData();
    const requestBody = new Blob([JSON.stringify(request)], { type: 'application/json' });

    formData.append('body', requestBody);
    imageFiles.forEach((file) => formData.append('imageFiles', file, file.name));

    const response = await userApi.post<CreateInquiryResponse>('/inquiries', formData);
    return response.data;
  };

  return { createInquiry };
}

export default useInquiry;
