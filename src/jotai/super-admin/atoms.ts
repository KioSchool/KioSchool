import { defaultPaginationValue } from '@@types/defaultValues';
import { EmailDomain, PaginationResponse } from '@@types/index';
import { atom } from 'jotai';

export const emailDomainPaginationResponseAtom = atom<PaginationResponse<EmailDomain>>(defaultPaginationValue);
