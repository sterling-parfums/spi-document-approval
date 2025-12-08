export type RequestFilters = {
  payee?: string;
  idNumber?: number;
  status?: string;
  amountFrom?: number;
  amountTo?: number;
  fromDate?: string;
  toDate?: string;
  internalRef?: string;
  externalRef?: string;
  sortBy?: string;
  sortOrder?: string;
};

export type RequestType = 'Sent' | 'Received';
