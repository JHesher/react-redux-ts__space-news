export const getHighlightedText = (text: string, highlight: string[]) => {
  return <span>{text.split(' ').map(part => highlight.some(value => value.toLowerCase() === part.toLowerCase())
    ? <span className='highlight'>{`${part} `}</span> 
    : `${part} `)}</span>;
}