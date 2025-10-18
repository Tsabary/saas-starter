import { resetDiv, CommentSkeleton } from "@replyke/ui-core-react-js";

export function LoadingState() {
  return (
    <div
      style={{
        ...resetDiv,
        display: "grid",
        gap: "16px",
        paddingBottom: 24,
        paddingRight: 16,
        paddingLeft: 16,
      }}
    >
      {[1, 2, 3].map((i) => (
        <CommentSkeleton key={i} />
      ))}
    </div>
  );
}
