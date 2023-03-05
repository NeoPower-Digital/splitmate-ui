// DEBTS
export interface Debt {
  address: string;
  amount: number;
  name?: string;
}

export interface DebtsByGroup {
  groupId: number;
  debts: Array<Debt>;
}

// GROUPS
export interface Group {
  id: number;
  name: string;
  debtValue: number;
  members: Array<GroupMember>;
}

export interface GroupMember {
  address: string;
  name: string;
}

export const groupsDataMock: Array<Group> = [
  {
    id: 1,
    name: 'ETH Denver',
    debtValue: 60,
    members: [
      { address: '0x12...456', name: 'Bob' },
      { address: '0x12...457', name: 'Alice' },
      { address: '0x12...458', name: 'Tom' },
    ],
  },
  {
    id: 2,
    name: 'Trip to NY',
    debtValue: 145,
    members: [
      { address: '0x12...520', name: 'John' },
      { address: '0x12...521', name: 'Matt' },
      { address: '0x12...522', name: 'Mike' },
    ],
  },
  {
    id: 3,
    name: 'Soccer game',
    debtValue: 336,
    members: [
      { address: '0x12...636', name: 'Jane' },
      { address: '0x12...637', name: 'Alice' },
      { address: '0x12...638', name: 'Rita' },
    ],
  },
];

export const debtsByGroupMock: Array<DebtsByGroup> = [
  {
    groupId: 1,
    debts: [
      {
        address: '0x12...456',
        amount: 10,
      },
      {
        address: '0x12...457',
        amount: 50,
      },
    ],
  },
  {
    groupId: 2,
    debts: [
      {
        address: '0x12...520',
        amount: 25,
      },
      {
        address: '0x12...521',
        amount: 60,
      },
      {
        address: '0x12...522',
        amount: 60,
      },
    ],
  },
  {
    groupId: 3,
    debts: [
      {
        address: '0x12...636',
        amount: 12,
      },
      {
        address: '0x12...637',
        amount: 24,
      },
      {
        address: '0x12...638',
        amount: 300,
      },
    ],
  },
];

export interface SplitMateAccount {
  groups: Array<Group>;
  debtsByGroup: Array<DebtsByGroup>;
}

export const splitMateAccountMock: SplitMateAccount = {
  groups: groupsDataMock,
  debtsByGroup: debtsByGroupMock,
};
