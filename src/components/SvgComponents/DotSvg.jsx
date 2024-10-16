export default function DotSvg(props) {
  return (
    <svg
      className="dot"
      stroke="currentColor"
      fill="#fff"
      strokeWidth={0}
      viewBox="0 0 512 512"
      height="25px"
      width="25px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M256 56c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m0-48C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 168c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80z" />
    </svg>
  );
}
