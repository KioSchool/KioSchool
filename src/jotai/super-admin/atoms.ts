import { defaultPaginationValue } from '@@types/defaultValues';
import { Bank, EmailDomain, PaginationResponse } from '@@types/index';
import { atom } from 'jotai';

export const superAdminEmailDomainPaginationResponseAtom = atom<PaginationResponse<EmailDomain>>(defaultPaginationValue);
export const superAdminBankPaginationResponseAtom = atom<PaginationResponse<Bank>>(defaultPaginationValue);
