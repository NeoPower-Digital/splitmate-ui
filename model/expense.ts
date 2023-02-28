export interface Expense {
  group: number;
  amount: number;
  description: string;
  payerAddress: string;
  distribution: ExpenseDistribution;
}

export type DistributionType = 'EQUALLY' | 'UNEQUALLY';

export interface ExpenseDistribution {
  distributionType: DistributionType;
  distributionByMembers: Array<DistributionByMember>;
}

export interface DistributionByMember {
  memberAddress: string;
  value: boolean | number;
}
