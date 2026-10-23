export interface RenewOption {
  id: string;
  label: string;
}

export const personalRenewOptions: RenewOption[] = [
  { id: '35f03c1c-6883-4fed-a623-7798875c0a60', label: '1个月' },
  { id: '9472c232-4d18-4bbf-9c95-6b11a224960c', label: '3个月' },
  { id: '9f26ab43-bb58-458c-8278-8b76cbe951c5', label: '6个月' },
  { id: 'd4f54993-1caf-43b5-8f5a-646abbf4aa39', label: '12个月' },
];

export const familyRenewOptions: RenewOption[] = [
  { id: 'a5c9e9a5-6d0c-4d1f-8d0b-2c0f0b6b9b2e', label: '1个月' },
  { id: 'b3b5c5b5-0f9b-4b7b-8f4a-3d5e3f1b3b7b', label: '3个月' },
  { id: 'c7c9c9c9-4f8b-4d1e-8f2b-4d4e4f1b4f8b', label: '6个月' },
  { id: 'd9d9d9d9-105e-4031-b017-c4f08ea5f996', label: '12个月' },
];
