import TransactionBuyDialog from "@/features/transaction/components/transaction-buy-dialog";
import TransactionDetailDialog from "@/features/transaction/components/transaction-detail-dialog";

const DialogProviders = () => {
  return (
    <>
      <TransactionDetailDialog />
      <TransactionBuyDialog />
    </>
  );
};

export default DialogProviders;
