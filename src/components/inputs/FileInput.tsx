import '../../assets/styles/components/inputs/file/index.scss';
import type { JSX } from 'react';
import { useRef, useState } from 'react';
import Block from '../layout/Block';
import Button from '../buttons/Button';

export interface FileInputProps {
  name?: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (file: File) => void;
}

export default function FileInput({
  name,
  placeholder,
  required,
  disabled,
  className,
  onChange,
}: FileInputProps): JSX.Element {
  const [photo, setPhoto] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function getStyles(): string {
    const styles = ['input--file'];
    if (className) styles.push(...className.split(' '));

    return styles.join(' ');
  }

  function handleImage(files: FileList | null): void {
    if (!files || !files.length) return;

    const reader = new FileReader();
    reader.onload = (event): void => setPhoto(event.target?.result as string);

    reader.readAsDataURL(files[0]);

    onChange?.(files[0]);
  }

  return (
    <Block
      className={getStyles()}
      direction="column"
      alignItems="center"
      gap="gap-[8px]"
    >
      <input
        type="file"
        name={name}
        required={required}
        disabled={disabled}
        onChange={({ target }) => handleImage(target.files)}
        ref={inputRef}
      />

      {photo && <img className="input--file__image" src={photo} alt="" />}

      <Button
        disabled={disabled}
        onClick={(event) => {
          event?.preventDefault();
          !disabled && inputRef.current?.click();
        }}
      >
        {placeholder}
      </Button>
    </Block>
  );
}
