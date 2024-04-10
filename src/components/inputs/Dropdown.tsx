import type { JSX, PropsWithChildren } from 'react';
import { useState } from 'react';
import '../../assets/styles/components/inputs/dropdown/index.scss';
import Input from './Input';
import Block from '../layout/Block';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown as ArrowIcon } from '@fortawesome/free-solid-svg-icons';

export interface DropdownProps extends PropsWithChildren {
  placeholder?: string;
  content: string[];
  disabled?: boolean;
  className?: string;
  onChange?: (item: string, index: number) => void;
}

function Dropdown({
  placeholder,
  content,
  disabled = false,
  className,
  onChange,
}: DropdownProps): JSX.Element {
  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const [filter, setFilter] = useState('');

  function getStyles(): string {
    const styles = ['dropdown'];
    if (disabled) styles.push('dropdown--disabled');
    if (className) styles.push(...className.split(' '));

    return styles.join(' ');
  }

  function getItemStyles(index: number): string {
    const styles = ['dropdown__content__item'];
    if (value === index) styles.push('active');

    return styles.join(' ');
  }

  function changeHandler(index: number): void {
    setValue(index);
    onChange?.(content[index], index);
  }

  function clickHandler(): void {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  }

  return (
    <Block className={getStyles()} direction="column">
      <Input
        className="dropdown__selector"
        placeholder={placeholder}
        disabled={disabled}
        endIcon={
          <FontAwesomeIcon
            icon={ArrowIcon}
            className={isOpen ? 'rotate-180' : undefined}
          />
        }
        onClick={clickHandler}
        onChange={(value) => setFilter(value)}
      />

      <Block
        className={`dropdown__content dropdown__content--${isOpen ? 'opened' : 'closed'}`}
        direction="column"
      >
        {content
          .filter((item) => item.toLowerCase().includes(filter.toLowerCase()))
          .map((item, index) => (
            <div
              key={`${item}-${index}-${Date.now()}`}
              className={getItemStyles(index)}
              onClick={() => changeHandler(index)}
            >
              {item}
            </div>
          ))}
      </Block>
    </Block>
  );
}

export default Dropdown;
