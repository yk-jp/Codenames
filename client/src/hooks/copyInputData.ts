const copyInputData = (inputData: string): void => {
  const copyText: HTMLInputElement = document.getElementById(inputData) as HTMLInputElement;
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

export default copyInputData;