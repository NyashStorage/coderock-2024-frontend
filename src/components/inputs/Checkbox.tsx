import { JSX, PropsWithChildren, useState } from 'react';
import '../../assets/styles/components/inputs/checkbox/index.scss';
import Block from '../layout/Block';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export interface CheckboxProps extends PropsWithChildren {
  name?: string;
  value?: string;
  label: string;
  disabled: boolean;
  defaultChecked: boolean;
}

function Checkbox({
  name,
  value,
  label,
  disabled = false,
  defaultChecked = false,
}: CheckboxProps): JSX.Element {
  const [checked, setChecked] = useState(defaultChecked);

  function getStyles(): string {
    const styles = ['checkbox'];
    if (disabled) styles.push('checkbox--disabled');

    return styles.join(' ');
  }

  return (
    <Block
      alignItems="center"
      gap="gap-[8px]"
      className={getStyles()}
      element="label"
      htmlFor={`${name}${Date.now()}`}
    >
      <input
        type="checkbox"
        name={name}
        value={value}
        id={`${name}${Date.now()}`}
        disabled={disabled}
        checked={checked}
        onChange={({ target }) => setChecked(target.checked)}
      />

      <Block alignItems="center" justify="center" className="checkbox__check">
        {checked && <FontAwesomeIcon icon={faCheck} />}
      </Block>
      <span>{label}</span>
    </Block>
  );
}

export default Checkbox;
