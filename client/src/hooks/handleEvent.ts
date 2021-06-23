const handleEvent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, inputData: string): void => {
  if (!inputData) e.preventDefault();
}

export default handleEvent;