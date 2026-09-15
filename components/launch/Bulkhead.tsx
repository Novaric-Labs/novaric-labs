/** A riveted frame between compartments, stamped with its station number. */
export default function Bulkhead({ sta, label }: { sta: string; label: string }) {
  return (
    <div className="bulkhead">
      <span className="sta mono">
        STA <b>{sta}</b> &nbsp;{label}
      </span>
    </div>
  );
}
