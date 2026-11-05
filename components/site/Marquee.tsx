const ROLES = [
  "leasing teams",
  "back offices",
  "dispatchers",
  "claims teams",
  "clinic admins",
  "paralegals",
  "ops managers",
];

/** Who the work is for. The track is doubled so the loop is seamless. */
export default function Marquee() {
  const items = [...ROLES, ...ROLES];
  return (
    <div className="roles" aria-label="Built for operations teams">
      <div className="track">
        {items.map((role, i) => (
          <span key={`${role}-${i}`}>
            {i % ROLES.length === 0 && (
              <>
                Built for
                <i aria-hidden="true">✦</i>
              </>
            )}
            {role}
            <i aria-hidden="true">✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
