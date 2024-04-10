import '../../assets/styles/components/inputs/index.scss';
import type { ChangeEvent, JSX, PropsWithChildren, ReactNode } from 'react';
import { useRef, useState } from 'react';
import Block from '../layout/Block';

export interface InputProps extends PropsWithChildren {
  type?: 'text' | 'password';
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
  onClick?: () => void;
  onChange?: (value: string) => void;
}

export default function Input({
  type = 'text',
  name = '',
  placeholder,
  defaultValue,
  disabled = false,
  startIcon,
  endIcon,
  className,
  onClick,
  onChange,
}: InputProps): JSX.Element {
  const [value, setValue] = useState(defaultValue || '');

  const [isInputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function getStyles(isInputFocused: boolean): string {
    const styles = ['input'];
    if (disabled) styles.push('input--disabled');
    if (isInputFocused) styles.push('input--focused');
    if (className) styles.push(...className.split(' '));

    return styles.join(' ');
  }

  function changeHandler({ target }: ChangeEvent<HTMLInputElement>): void {
    setValue(target.value);
    onChange?.(target.value);
  }

  function clickHandler(): void {
    onClick?.();
    if (disabled) return;
    inputRef.current?.focus();
  }

  return (
    <Block
      className={getStyles(isInputFocused)}
      alignItems="center"
      gap="gap-[14px]"
      onClick={clickHandler}
    >
      {startIcon || <></>}

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={changeHandler}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        ref={inputRef}
      />

      {endIcon || <></>}
    </Block>
  );
}
