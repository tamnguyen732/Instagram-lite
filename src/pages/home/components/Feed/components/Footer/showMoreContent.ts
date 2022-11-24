const LIMIT_CHARACTER: number = 50;

const showMoreContent = (content: string, limit = LIMIT_CHARACTER) => {
  if (content.length > limit) {
    const newContent = content.substring(0, limit);
    return `${newContent} ...`;
  }
  return content;
};

export default showMoreContent;
