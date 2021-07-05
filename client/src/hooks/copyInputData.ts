const copyInputData = (id: string): void => {
  const copyText: HTMLInputElement = document.getElementById(id) as HTMLInputElement;
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

export default copyInputData;