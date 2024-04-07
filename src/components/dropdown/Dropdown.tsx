import React, { JSX, PropsWithChildren, useState } from 'react';
import '../../assets/styles/components/dropdown/index.scss';
import Typography from '../Typography';
import arr from './arr.png';

export interface DropdownProps extends PropsWithChildren {
  title: string;
  content: JSX.Element;
}

function Dropdown({ title, content }: DropdownProps): JSX.Element {
  const [thisOpen, setThisOpen] = useState(false);
  return (
    <div className="relative inline-block text-left w-56">
      <button
        type="button"
        className="title flex w-full justify-between rounded-md bg-white px-3 py-2 shadow-sm"
        aria-expanded="true"
        aria-haspopup="true"
        onClick={() => setThisOpen(!thisOpen)}
      >
        <Typography variant="body">{title}</Typography>
        <img src={arr} alt="" className={thisOpen ? 'rotate-180' : ''} />
      </button>
      <div
        className={`${thisOpen ? 'open ' : ''}content absolute inset-x-0 z-10 w-full px-3 overflow-hidden`}
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
