import type { JSX, PropsWithChildren } from 'react';
import { useState } from 'react';
import '../../assets/styles/components/inputs/dropdown/index.scss';
import Input from './Input';
import Block from '../layout/Block';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown as ArrowIcon } from '@fortawesome/free-solid-svg-icons';
import { orUndefined } from '../../helpers/сondition.helpers';

export interface DropdownProps extends PropsWithChildren {
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  content: string[];
  disabled?: boolean;
  className?: string;
  onChange?: (item: string) => void;
}

export default function Dropdown({
  name,
  placeholder,
  defaultValue,
  content,
  disabled = false,
  className,
  onChange,
}: DropdownProps): JSX.Element {
  const [value, setValue] = useState(defaultValue || '');
  const [isOpen, setIsOpen] = useState(false);

  const [filter, setFilter] = useState(defaultValue || '');

  function getStyles(): string {
    const styles = ['dropdown'];
    if (disabled) styles.push('dropdown--disabled');
    if (className) styles.push(...className.split(' '));

    return styles.join(' ');
  }

  function getItemStyles(item: string): string {
    const styles = ['dropdown__content__item'];
    if (value === item) styles.push('active');

    return styles.join(' ');
  }

  function changeHandler(item: string): void {
    setValue(item);
    setIsOpen(false);
    setFilter(item);

    onChange?.(item);
  }

  function clickHandler(): void {
    if (disabled) return;

    setIsOpen((prev) => !prev);
    if (!isOpen) setFilter('');
  }

  return (
    <Block className={getStyles()} direction="column">
      <Input
        className="dropdown__selector"
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        endIcon={
          <FontAwesomeIcon
            icon={ArrowIcon}
            className={orUndefined(isOpen, 'rotate-180')}
          />
        }
        onClick={clickHandler}
        value={filter}
        onChange={(value) => setFilter(value)}
      />

      <Block
        className={`dropdown__content dropdown__content--${isOpen ? 'opened' : 'closed'}`}
        direction="column"
      >
        {content
          .filter((item) => item.toLowerCase().includes(filter.toLowerCase()))
          .map((item) => (
            <div
              key={`${item}-${Date.now()}`}
              className={getItemStyles(item)}
              onClick={() => changeHandler(item)}
            >
              {item}
            </div>
          ))}
      </Block>
    </Block>
  );
}
