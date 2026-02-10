export const WALLETAPIJSON = {
    listTransactions: (params: any) => {
        return {
            pageNo: params.page,
            limit: params.limit,
            ...(params.searchTerm !== undefined && { searchTerm: params.searchTerm.trim() }),
            sortKey: params.sortKey || "createdAt",
            sortOrder: params.sortOrder || -1,
            needCount: true,
            ...(params.userId !== undefined && { userId: params.userId }),
            ...(params.transactionStatus !== undefined && { transactionStatus: params.transactionStatus }),
        };
    },
    approveDeposit: (note: string) => {
        return {
            note: note.trim()
        };
    }
}
