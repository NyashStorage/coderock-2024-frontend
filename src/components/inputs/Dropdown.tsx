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
  disable?: boolean;
  onChange?: (item: string, index: number) => void;
}

function Dropdown({
  placeholder,
  content,
  disable = false,
  onChange,
}: DropdownProps): JSX.Element {
  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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
    if (disable) return;
    setIsOpen((prev) => !prev);
  }

  return (
    <Block className="dropdown" direction="column">
      <Input
        className="dropdown__selector"
        placeholder={placeholder}
        disabled
        endIcon={
          <FontAwesomeIcon
            icon={ArrowIcon}
            className={isOpen ? 'rotate-180' : undefined}
          />
        }
        onClick={clickHandler}
      />

      <div className="dropdown__content">
        {content.map((item, index) => (
          <div
            className={getItemStyles(index)}
            onClick={() => changeHandler(index)}
          >
            {item}
          </div>
        ))}
      </div>
    </Block>
  );
}

export default Dropdown;
