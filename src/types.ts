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