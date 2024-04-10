import '../../assets/styles/components/inputs/index.scss';
import type { JSX } from 'react';
import { useState } from 'react';
import type { InputProps } from './Input';
import Input from './Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye as ShowIcon,
  faEyeSlash as HideIcon,
} from '@fortawesome/free-solid-svg-icons';

export default function PasswordInput(props: InputProps): JSX.Element {
  const [isVisible, setVisible] = useState(false);

  return (
    <Input
      type={isVisible ? 'text' : 'password'}
      endIcon={
        <FontAwesomeIcon
          className="cursor-pointer"
          icon={isVisible ? HideIcon : ShowIcon}
          onClick={() => setVisible((prev) => !prev)}
        />
      }
      {...props}
    />
  );
}
