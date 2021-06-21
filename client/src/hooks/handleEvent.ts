const handleEvent = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, inputData: string): void => {
  if (!inputData) e.preventDefault();
}

export default handleEvent;