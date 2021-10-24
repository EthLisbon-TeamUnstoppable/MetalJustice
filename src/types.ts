export interface Participant {
  address: string,
  proof: string
}

export interface Dispute {
  disputeNum: number,
  colateral: number,
  description: string,
  participants: Participant[]
}

export type LocalDispute = {
  proofData: string,
  proofHash: string
}

export type LocalDisputes = Record<number, LocalDispute>;