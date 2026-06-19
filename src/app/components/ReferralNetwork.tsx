"use client";

import { useMemo, useState } from "react";
import { ChevronUp, Expand, TreePine, UserRoundSearch, Users, X } from "lucide-react";

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

const byId = new Map(people.map((person) => [person.id, person]));

function childrenOf(id: string) {
  return people.filter((person) => person.sponsorId === id);
}

function descendantsOf(id: string) {
  const result: ReferralPerson[] = [];
  const visit = (parentId: string) => {
    childrenOf(parentId).forEach((child) => {
      result.push(child);
      visit(child.id);
    });
  };
  visit(id);
  return result;
}

function levelLabel(person: ReferralPerson, rootId: string) {
  if (person.id === rootId) return "L0";
  const root = byId.get(rootId);
  if (!root) return `L${person.level}`;
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

  const root = byId.get(rootId) || people[0];
  const visibleChildren = useMemo(() => {
    const direct = childrenOf(root.id);
    if (direct.length) return direct;
    return descendantsOf(root.id).slice(0, 6);
  }, [root.id]);
  const nextLevel = useMemo(() => {
    return visibleChildren.flatMap((child) => childrenOf(child.id)).filter((person) => person.id !== root.id);
  }, [visibleChildren, root.id]);

  const memberTitle = mode === "investor" ? "My Referrals" : "My Referral Network";
  const openLabel = mode === "admin" ? "Open Full Referral Network" : "Open My Referral Network";
  const scopeCopy = mode === "admin"
    ? "Admin can see the full organization and open any person to review their referrals."
    : "This is your referral view. Select a person to open their referrals, or press View Upline to see who brought them in.";
  const totalCount = mode === "admin" ? 128 : 28;

  const showUpline = (person: ReferralPerson) => {
    setUplineId(person.id);
  };

  const openPerson = (person: ReferralPerson) => {
    setRootId(person.id);
    setUplineId(null);
  };

  const sponsor = uplineId ? byId.get(byId.get(uplineId)?.sponsorId || "") : null;
  const uplinePerson = uplineId ? byId.get(uplineId) : null;

  const renderPerson = (person: ReferralPerson, isRoot = false) => (
    <button
      key={`${person.id}-${isRoot ? "root" : "node"}`}
      type="button"
      onClick={() => openPerson(person)}
      className={`sn-ref-node ${isRoot ? "sn-ref-root" : ""}`}
    >
      <span className="sn-ref-level">{levelLabel(person, root.id)}</span>
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
            Back To Main Network
          </button>
        ) : null}
      </div>

      <p className="sn-ref-copy">{scopeCopy}</p>

      {uplinePerson ? (
        <div className="sn-ref-upline-panel">
          <UserRoundSearch size={16} />
          <span>
            <b>{uplinePerson.name}</b>{" "}
            {sponsor ? `was brought in by ${sponsor.name}.` : "is the top of this referral network."}
          </span>
        </div>
      ) : null}

      <div className="sn-ref-canvas">
        <div className="sn-ref-level-row sn-ref-root-row">
          {renderPerson(root, true)}
        </div>
        <div className="sn-ref-line" />
        <div className="sn-ref-level-title">L1 Referrals</div>
        <div className="sn-ref-level-row">
          {visibleChildren.length ? visibleChildren.map((person) => renderPerson(person)) : (
            <div className="sn-ref-empty">No referrals under this person yet.</div>
          )}
        </div>
        {nextLevel.length ? (
          <>
            <div className="sn-ref-line" />
            <div className="sn-ref-level-title">L2 Referrals</div>
            <div className="sn-ref-level-row sn-ref-compact-row">
              {nextLevel.map((person) => renderPerson(person))}
            </div>
          </>
        ) : null}
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
          <span><TreePine size={16} /> {mode === "admin" ? "Full tree" : "40 max"}</span>
        </div>
      </div>

      {networkBody}

      {expanded ? (
        <div className="sn-ref-full">
          <div className="sn-ref-fullbar">
            <div>
              <h2>{memberTitle}</h2>
              <p>{mode === "admin" ? "Expanded admin referral network." : "Expanded personal referral network."}</p>
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
