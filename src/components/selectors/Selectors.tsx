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
    <div className="flex gap-8 p-5">
      <label htmlFor="gender" className="flex gap-2">
        <p className="text-pink-100 text-lg">Gender:</p>
        <select
          name="gender"
          id="gender"
          onChange={handleChange}
          value={gender}
          className="rounded-md text-pink-100 bg-transparent border-2"
        >
          {GENDER.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="status" className="flex gap-2">
        <p className="text-pink-100 text-lg">Status:</p>
        <select
          name="status"
          id="status"
          onChange={handleChange}
          value={status}
          className="rounded-md text-pink-100 bg-transparent border-2"
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
