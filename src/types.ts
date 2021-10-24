export interface Participant {
  address: string,
  proof: string
}

export interface Dispute {
  disputeNum: number,
  colateral: string,
  description: string,
  participants: Participant[]
}

export type LocalDispute = {
  proofData: string,
  proofHash: string
}

export type LocalDisputes = Record<number, LocalDispute>;

export enum CaseStates {
	Undefined = 0,
	Requested,
	Accepted,
	DisclosingProofs,
	Judging,
	Won,
	Lost,
	Aborted,
	Closed
}