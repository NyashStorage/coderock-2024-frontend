import type { FormEvent, JSX, PropsWithChildren } from 'react';

interface FormProps extends PropsWithChildren {
  className?: string;
  onSuccess: (data: Record<string, any>) => void;
}

export default function FormContainer({
  className,
  onSuccess,
  children,
}: FormProps): JSX.Element {
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const formData: { [key: string]: any } = {};
    new FormData(event.currentTarget).forEach(
      (value, name) => (formData[name] = value),
    );

    onSuccess(formData);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
