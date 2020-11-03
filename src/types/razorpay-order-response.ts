export interface RazorPayOrderResponse {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    offer_id?: any;
    status: string;
    attempts: number;
    notes: Notes;
    created_at: number;
}


interface Notes {
  name: string;
  email: string;
}
