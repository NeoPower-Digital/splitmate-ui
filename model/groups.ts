export interface Group {
  id: number;
  name: string;
  members: Array<GroupMember>;
}

export interface GroupMember {
  address: string;
  name: string;
}

export const userGroupsDataMock: Array<Group> = [
  {
    id: 1,
    name: 'ETH Denver',
    members: [
      { address: '0x12...456', name: 'Bob' },
      { address: '0x12...457', name: 'Alice' },
      { address: '0x12...458', name: 'Tom' },
    ],
  },
  {
    id: 2,
    name: 'Trip to NY',
    members: [
      { address: '0x12...520', name: 'John' },
      { address: '0x12...521', name: 'Matt' },
      { address: '0x12...522', name: 'Mike' },
    ],
  },
  {
    id: 3,
    name: 'Soccer game',
    members: [
      { address: '0x12...636', name: 'Jane' },
      { address: '0x12...637', name: 'Alice' },
      { address: '0x12...638', name: 'Rita' },
    ],
  },
];
