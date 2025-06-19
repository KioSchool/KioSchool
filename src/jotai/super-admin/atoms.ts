import { defaultPaginationValue } from '@@types/defaultValues';
import { Bank, EmailDomain, PaginationResponse } from '@@types/index';
import { atom } from 'jotai';

export const emailDomainPaginationResponseAtom = atom<PaginationResponse<EmailDomain>>(defaultPaginationValue);
export const bankPaginationResponseAtom = atom<PaginationResponse<Bank>>(defaultPaginationValue);
