import type { JSX, PropsWithChildren } from 'react';
import React, { useState } from 'react';
import '../../assets/styles/components/dropdown/index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Button from '../buttons/Button';

export interface DropdownProps extends PropsWithChildren {
  placeholder: string;
  content: string[];
  onChange?: (item: string) => void;
}

function Dropdown({
  placeholder,
  content,
  onChange = (item): void => {},
}: DropdownProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <Button
        variant={'empty'}
        additionalClasses="placeholder"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{placeholder}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={isOpen ? 'rotate-180' : ''}
        />
      </Button>
      <div
        className={`${isOpen ? 'open ' : ''}content`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          {content.map((item: string) => (
            <div>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
