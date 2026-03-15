export type FieldConfig = {
    label: string;
    name: string;
    value: string;
    type?: string;
    error?: string;
    onChange: (value: string) => void;
};

export type AuthFormProps = {
    title: string;
    fields: FieldConfig[];
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    bottomText?: string;
    linkText?: string;
    onLinkClick?: () => void;
};
