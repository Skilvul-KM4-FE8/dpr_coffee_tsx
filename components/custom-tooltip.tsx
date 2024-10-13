export const CustomTooltip = ({ active, payload }: any) => {

    if (!active) return null

    const createdAt = payload[0].payload.createdAt
    const totalPrice = payload[0].payload.totalPrice

    return (
        <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
            <div className="p-3">
                <p className="text-sm text-muted-foreground">{createdAt}</p>
                <p className="text-lg font-bold">{Intl.NumberFormat("id-ID", {
                    currency: "IDR",
                    style: "currency",
                    maximumFractionDigits: 0
                }).format(totalPrice)}</p>
            </div>
        </div>
    )
}