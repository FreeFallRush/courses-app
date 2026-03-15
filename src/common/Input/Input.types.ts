export type InputProps = {
    labelText: string;
    placeholderText?: string;
    value: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isInvalid?: boolean;
};
