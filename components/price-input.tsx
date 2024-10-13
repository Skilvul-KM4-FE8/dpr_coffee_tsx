import CurrencyInput from "react-currency-input-field"

type Props = {
    value: string
    onChange: (value: string | undefined) => void
    placeholder?: string
    disabled?: boolean
}

export const PriceInput = ({value, onChange, disabled, placeholder}: Props) => {

    // const parsedValue = parseFloat(value.toString())

    return (
        <div className="relative">
            <CurrencyInput 
                name="price"
                placeholder={placeholder}
                defaultValue={value}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                onValueChange={onChange}
                disabled={disabled}
                prefix="Rp."
            />
        </div>
    )
}