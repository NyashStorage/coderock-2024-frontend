import type { JSX, PropsWithChildren } from 'react';
import React, { useState } from 'react';
import '../../assets/styles/components/dropdown/index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Button from '../buttons/Button';

export interface DropdownProps extends PropsWithChildren {
  placeholder: string[];
  content: JSX.Element;
}

function Dropdown({ placeholder, content }: DropdownProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown relative inline-block text-left w-56">
      <Button
        variant={'empty'}
        newClass="title flex w-full justify-between rounded-md bg-white px-3 py-2 shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{placeholder}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={isOpen ? 'rotate-180' : ''}
        />
      </Button>
      <div
        className={`${isOpen ? 'open ' : ''}content absolute inset-x-0 z-10 w-full px-3 overflow-hidden`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          {content}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
