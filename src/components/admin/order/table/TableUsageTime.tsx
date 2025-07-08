interface TableUsageTimeProps {
  usageTime: string;
}

function TableUsageTime({ usageTime }: TableUsageTimeProps) {
  return <div>{usageTime}</div>;
}

export default TableUsageTime;
