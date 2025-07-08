interface TableSessionInfoProps {
  timeLimit: number;
}

function TableSessionInfo({ timeLimit }: TableSessionInfoProps) {
  return <div>{timeLimit}분 사용 가능</div>;
}

export default TableSessionInfo;
