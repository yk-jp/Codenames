import { ChangeEvent, Dispatch } from 'react';
import ITable from '../../interfaces/ITable';
import Storage from '../../config/storage';

export const cardLanguageController = (e: ChangeEvent<HTMLInputElement>) => {
  sessionStorage.setItem("language", e.target.id);
};

export const cardLanguageStyleContoller = (table: ITable, setIsCardLanguageDisabled: Dispatch<boolean>) => {
  if (table.status !== "START") setIsCardLanguageDisabled(true);
  else setIsCardLanguageDisabled(false);
};

export const cardLanguageInitialize = () => {
  const { language } = Storage();
  // language option
  if (language) document.getElementById(language)!["checked"] = true;
};

