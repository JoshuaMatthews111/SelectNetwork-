"use client";

import { useMemo, useState } from "react";
import { ChevronUp, Expand, RotateCcw, TreePine, UserRoundSearch, Users, X } from "lucide-react";

type RoleMode = "admin" | "investor" | "builder";

type ReferralPerson = {
  id: string;
  name: string;
  role: string;
  status: "Active" | "Pending" | "Review";
  level: number;
  units: number;
  invested: string;
  joined: string;
  sponsorId?: string;
  photo: string;
};

const people: ReferralPerson[] = [
  { id: "lorenzo", name: "Lorenzo", role: "Origin", status: "Active", level: 0, units: 50, invested: "$50,000", joined: "May 19, 2025", photo: "https://i.pravatar.cc/120?img=68" },
  { id: "maria", name: "Maria Santos", role: "Investor-Builder", status: "Active", level: 1, units: 25, invested: "$25,000", joined: "May 20, 2025", sponsorId: "lorenzo", photo: "https://i.pravatar.cc/120?img=47" },
  { id: "david", name: "David Chen", role: "Investor", status: "Pending", level: 1, units: 10, invested: "$10,000", joined: "May 22, 2025", sponsorId: "lorenzo", photo: "https://i.pravatar.cc/120?img=12" },
  { id: "james", name: "James Wilson", role: "Builder", status: "Active", level: 1, units: 15, invested: "$15,000", joined: "May 28, 2025", sponsorId: "lorenzo", photo: "https://i.pravatar.cc/120?img=52" },
  { id: "sophia", name: "Sophia Lee", role: "Investor", status: "Active", level: 2, units: 5, invested: "$5,000", joined: "Jun 1, 2025", sponsorId: "maria", photo: "https://i.pravatar.cc/120?img=5" },
  { id: "michael", name: "Michael Brown", role: "Investor-Builder", status: "Active", level: 2, units: 8, invested: "$8,000", joined: "Jun 5, 2025", sponsorId: "maria", photo: "https://i.pravatar.cc/120?img=11" },
  { id: "emily", name: "Emily Davis", role: "Investor", status: "Pending", level: 2, units: 3, invested: "$3,000", joined: "Jun 8, 2025", sponsorId: "maria", photo: "https://i.pravatar.cc/120?img=9" },
  { id: "chris", name: "Chris Park", role: "Investor", status: "Active", level: 2, units: 12, invested: "$12,000", joined: "Jun 10, 2025", sponsorId: "david", photo: "https://i.pravatar.cc/120?img=14" },
  { id: "ana", name: "Ana Torres", role: "Builder", status: "Active", level: 2, units: 6, invested: "$6,000", joined: "Jun 12, 2025", sponsorId: "david", photo: "https://i.pravatar.cc/120?img=16" },
  { id: "tyler", name: "Tyler Reed", role: "Investor", status: "Active", level: 3, units: 4, invested: "$4,000", joined: "Jun 20, 2025", sponsorId: "sophia", photo: "https://i.pravatar.cc/120?img=33" },
  { id: "keisha", name: "Keisha Moore", role: "Investor-Builder", status: "Active", level: 3, units: 7, invested: "$7,000", joined: "Jun 22, 2025", sponsorId: "michael", photo: "https://i.pravatar.cc/120?img=25" },
  { id: "ryan", name: "Ryan Scott", role: "Investor", status: "Review", level: 3, units: 2, invested: "$2,500", joined: "Jun 25, 2025", sponsorId: "michael", photo: "https://i.pravatar.cc/120?img=15" },
];

const adminPlaceholderPeople: ReferralPerson[] = Array.from({ length: 7 }, (_, index) => {
  const level = index + 4;
  const sponsorId = level === 4 ? "tyler" : `future-l${level - 1}`;
  return {
    id: `future-l${level}`,
    name: `Future Level ${level}`,
    role: "Placeholder",
    status: "Review",
    level,
    units: 0,
    invested: "$0",
    joined: "Future growth",
    sponsorId,
    photo: `https://i.pravatar.cc/120?img=${38 + index}`,
  };
});

function levelLabel(person: ReferralPerson, root: ReferralPerson) {
  if (person.id === root.id) return "L0";
  const relative = Math.max(1, person.level - root.level);
  return `L${relative}`;
}

function statusStyle(status: ReferralPerson["status"]) {
  if (status === "Active") return { background: "#e3f5eb", color: "#087345" };
  if (status === "Pending") return { background: "#fffaf0", color: "#bd8e28" };
  return { background: "#eef2ff", color: "#1e4fa3" };
}

export default function ReferralNetwork({
  mode,
  preview = false,
  onOpenFull,
}: {
  mode: RoleMode;
  preview?: boolean;
  onOpenFull?: () => void;
}) {
  const [rootId, setRootId] = useState("lorenzo");
  const [uplineId, setUplineId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const isLimitedView = mode !== "admin";
  const visiblePeople = useMemo(() => {
    if (!isLimitedView) return [...people, ...adminPlaceholderPeople];
    return people.filter((person) => person.level <= 3).slice(0, 40);
  }, [isLimitedView]);
  const visibleById = useMemo(() => new Map(visiblePeople.map((person) => [person.id, person])), [visiblePeople]);
  const getChildren = (id: string) => visiblePeople.filter((person) => person.sponsorId === id);

  const root = visibleById.get(rootId) || visiblePeople[0] || people[0];
  const levelRows = useMemo(() => {
    const rows: ReferralPerson[][] = [];
    const visited = new Set<string>([root.id]);
    let current = getChildren(root.id);
    let visibleCount = 1;

    while (current.length) {
      const unique = current.filter((person) => !visited.has(person.id));
      const availableSlots = isLimitedView ? Math.max(0, 40 - visibleCount) : unique.length;
      const row = isLimitedView ? unique.slice(0, availableSlots) : unique;
      if (!row.length) break;

      row.forEach((person) => visited.add(person.id));
      rows.push(row);
      visibleCount += row.length;
      current = row.flatMap((person) => getChildren(person.id));
    }

    return rows;
  }, [root.id, visiblePeople, isLimitedView]);

  const memberTitle = mode === "investor" ? "My Referrals" : "My Referral Network";
  const openLabel = mode === "admin" ? "View Full Organization Tree" : "View Full Referral Network";
  const scopeCopy = mode === "admin"
    ? "Admin can see the full organization, including 10 placeholder levels now. Live data can keep expanding past L10 without changing this view."
    : "This is your referral view. Select a person to open their referrals, or press View Upline to see who brought them in. Builder visibility is capped at L1-L3 and 40 total people including you.";
  const totalCount = mode === "admin" ? 128 : Math.min(visiblePeople.length, 40);

  const showUpline = (person: ReferralPerson) => {
    setUplineId(person.id);
  };

  const openPerson = (person: ReferralPerson) => {
    setRootId(person.id);
    setUplineId(null);
  };

  const sponsor = uplineId ? visibleById.get(visibleById.get(uplineId)?.sponsorId || "") : null;
  const uplinePerson = uplineId ? visibleById.get(uplineId) : null;

  const renderPerson = (person: ReferralPerson, isRoot = false) => (
    <button
      key={`${person.id}-${isRoot ? "root" : "node"}`}
      type="button"
      onClick={() => openPerson(person)}
      className={`sn-ref-node ${isRoot ? "sn-ref-root" : ""}`}
    >
      <span className="sn-ref-level">{levelLabel(person, root)}</span>
      <img src={person.photo} alt={`${person.name} profile`} className="sn-ref-photo" />
      <strong>{person.name}</strong>
      <small>{person.role}</small>
      <span className="sn-ref-meta">{person.units} Units · {person.invested}</span>
      <span className="sn-ref-status" style={statusStyle(person.status)}>{person.status}</span>
      <span
        role="button"
        tabIndex={0}
        className="sn-ref-upline"
        onClick={(event) => {
          event.stopPropagation();
          showUpline(person);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            event.stopPropagation();
            showUpline(person);
          }
        }}
      >
        <ChevronUp size={12} />
        View Upline
      </span>
    </button>
  );

  const networkBody = (
    <>
      <div className="sn-ref-actions">
        {preview && onOpenFull ? (
          <button type="button" onClick={onOpenFull} className="sn-ref-primary">
            <TreePine size={16} />
            View Referral Network
          </button>
        ) : null}
        <button type="button" onClick={() => setExpanded(true)} className="sn-ref-gold">
          <Expand size={16} />
          {openLabel}
        </button>
        {root.id !== "lorenzo" ? (
          <button type="button" onClick={() => setRootId("lorenzo")} className="sn-ref-light">
            <RotateCcw size={15} />
            Back To Main Network
          </button>
        ) : null}
      </div>

      <p className="sn-ref-copy">{scopeCopy}</p>

      {uplinePerson ? (
        <div className="sn-ref-upline-panel">
          <img src={uplinePerson.photo} alt={`${uplinePerson.name} profile`} className="sn-ref-upline-photo" />
          <div className="sn-ref-upline-copy">
            <span className="sn-ref-upline-kicker"><UserRoundSearch size={14} /> Upline View</span>
            <b>{uplinePerson.name}</b>
            {sponsor ? (
              <span className="sn-ref-upline-sponsor">
                <img src={sponsor.photo} alt={`${sponsor.name} profile`} />
                was brought in by <b>{sponsor.name}</b>
              </span>
            ) : (
              <span>is the top of this referral network.</span>
            )}
          </div>
          <div className="sn-ref-upline-actions">
            <button type="button" onClick={() => openPerson(uplinePerson)}>Open Their Referrals</button>
            {sponsor ? <button type="button" onClick={() => openPerson(sponsor)}>Open Upline Tree</button> : null}
            <button type="button" onClick={() => setExpanded(true)}>View Full Tree</button>
          </div>
        </div>
      ) : null}

      <div className="sn-ref-canvas">
        <div className="sn-ref-level-row sn-ref-root-row">
          {renderPerson(root, true)}
        </div>
        {levelRows.length ? levelRows.map((row, index) => (
          <div key={`level-${index + 1}`}>
            <div className="sn-ref-line" />
            <div className="sn-ref-level-title">L{index + 1} Referrals</div>
            <div className={`sn-ref-level-row ${index > 0 ? "sn-ref-compact-row" : ""}`}>
              {row.map((person) => renderPerson(person))}
            </div>
          </div>
        )) : (
          <>
            <div className="sn-ref-line" />
            <div className="sn-ref-empty">No referrals under this person yet.</div>
          </>
        )}
      </div>
    </>
  );

  return (
    <section className={`sn-ref-panel ${preview ? "sn-ref-preview" : ""}`}>
      <div className="sn-ref-head">
        <div>
          <h2>{memberTitle}</h2>
          <p>{mode === "admin" ? "Full people tree with upline visibility." : "Referral activity, levels, and sponsor path."}</p>
        </div>
        <div className="sn-ref-stats">
          <span><Users size={16} /> {totalCount} people</span>
          <span><TreePine size={16} /> {mode === "admin" ? "L10+ ready" : "L1-L3 · 40 max"}</span>
        </div>
      </div>

      {networkBody}

      {expanded ? (
        <div className="sn-ref-full">
          <div className="sn-ref-fullbar">
            <div>
              <h2>{memberTitle}</h2>
              <p>{mode === "admin" ? "Expanded admin referral network with no cap." : "Expanded personal referral network capped at L1-L3 and 40 total people including you."}</p>
            </div>
            <button type="button" onClick={() => setExpanded(false)}>
              <X size={18} />
              Close
            </button>
          </div>
          <div className="sn-ref-fullbody">{networkBody}</div>
        </div>
      ) : null}
    </section>
  );
}
