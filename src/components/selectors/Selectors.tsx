/* eslint-disable react/no-array-index-key */
import React, { SyntheticEvent } from 'react';
import { GENDER, STATUS } from '../../data/constants';

interface SelectorsPropsI {
  handleChange: (e: SyntheticEvent) => void;
  gender: string;
  status: string;
}
export function Selectors({
  handleChange,
  gender,
  status,
}: SelectorsPropsI): JSX.Element {
  return (
    <div>
      <label htmlFor="gender">
        <p>Gender:</p>
        <select
          name="gender"
          id="gender"
          onChange={handleChange}
          value={gender}
        >
          {GENDER.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="status">
        <select
          name="status"
          id="status"
          onChange={handleChange}
          value={status}
        >
          {STATUS.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
