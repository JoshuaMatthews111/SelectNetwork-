"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronUp, Copy, Expand, RotateCcw, Save, TreePine, UserRoundSearch, Users, X } from "lucide-react";

type RoleMode = "admin" | "investor" | "builder";

type ReferralPerson = {
  id: string;
  name: string;
  role: string;
  status: "Active" | "Pending" | "Review";
  level: number;
  units: number;
  capitalCommitted: string;
  joined: string;
  sponsorId?: string;
  photo: string;
};

type MemberRecord = {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  units?: number;
  invested_amount?: number;
  capital_commitment?: number;
  joined_date?: string;
  sponsor_id?: string;
  avatar_url?: string;
};

const rootPerson: ReferralPerson = {
  id: "lorenzo",
  name: "Lorenzo",
  role: "Origin",
  status: "Active",
  level: 0,
  units: 50,
  capitalCommitted: "$50,000",
  joined: "May 19, 2025",
  photo: "/assets/select-network/IMG_9919.png",
};

const demoPeople: ReferralPerson[] = [
  rootPerson,
  { id: "maria", name: "Maria Santos", role: "Select Member-Builder", status: "Active", level: 1, units: 25, capitalCommitted: "$25,000", joined: "May 20, 2025", sponsorId: "lorenzo", photo: "https://i.pravatar.cc/120?img=47" },
  { id: "david", name: "David Chen", role: "Select Member", status: "Pending", level: 1, units: 10, capitalCommitted: "$10,000", joined: "May 22, 2025", sponsorId: "lorenzo", photo: "https://i.pravatar.cc/120?img=12" },
  { id: "james", name: "James Wilson", role: "Builder", status: "Active", level: 1, units: 15, capitalCommitted: "$15,000", joined: "May 28, 2025", sponsorId: "lorenzo", photo: "https://i.pravatar.cc/120?img=52" },
  { id: "sophia", name: "Sophia Lee", role: "Select Member", status: "Active", level: 2, units: 5, capitalCommitted: "$5,000", joined: "Jun 1, 2025", sponsorId: "maria", photo: "https://i.pravatar.cc/120?img=5" },
  { id: "michael", name: "Michael Brown", role: "Select Member-Builder", status: "Active", level: 2, units: 8, capitalCommitted: "$8,000", joined: "Jun 5, 2025", sponsorId: "maria", photo: "https://i.pravatar.cc/120?img=11" },
  { id: "tyler", name: "Tyler Reed", role: "Select Member", status: "Active", level: 3, units: 4, capitalCommitted: "$4,000", joined: "Jun 20, 2025", sponsorId: "sophia", photo: "https://i.pravatar.cc/120?img=33" },
];

function roleLabel(value?: string) {
  if (value === "builder") return "Select Member-Builder";
  if (value === "admin") return "Admin";
  return "Select Member";
}

function statusLabel(value?: string): ReferralPerson["status"] {
  if (value === "active") return "Active";
  if (value === "pending") return "Pending";
  return "Review";
}

function money(value?: number) {
  return `$${Math.round(Number(value) || 0).toLocaleString()}`;
}

function fallbackAvatar(member: MemberRecord) {
  const label = encodeURIComponent(member.name || member.email || "Member");
  return `https://ui-avatars.com/api/?name=${label}&background=075933&color=ffd46f&bold=true`;
}

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

function isLorenzo(member: MemberRecord) {
  const name = String(member.name || "").toLowerCase();
  const email = String(member.email || "").toLowerCase();
  return name.includes("lorenzo") || email === "tmillerk999@gmail.com";
}

function buildLivePeople(members: MemberRecord[]) {
  const lorenzoRecord = members.find(isLorenzo);
  const lorenzoDatabaseId = lorenzoRecord?.id;
  const root: ReferralPerson = lorenzoRecord ? {
    ...rootPerson,
    units: Number(lorenzoRecord.units) || rootPerson.units,
    capitalCommitted: money(Number(lorenzoRecord.invested_amount || lorenzoRecord.capital_commitment) || 50000),
    joined: lorenzoRecord.joined_date ? new Date(lorenzoRecord.joined_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : rootPerson.joined,
    photo: lorenzoRecord.avatar_url || rootPerson.photo,
  } : rootPerson;

  const livePeople = members
    .filter((member) => member.id && !isLorenzo(member))
    .map((member) => {
      const rawSponsorId = member.sponsor_id && member.sponsor_id !== member.id ? member.sponsor_id : "lorenzo";
      const sponsorId = rawSponsorId === lorenzoDatabaseId ? "lorenzo" : rawSponsorId;
      const capital = Number(member.invested_amount || member.capital_commitment) || 0;
      return {
        id: String(member.id),
        name: member.name || member.email || "Select Member",
        role: roleLabel(member.role),
        status: statusLabel(member.status),
        level: 1,
        units: Number(member.units) || Math.round(capital / 100),
        capitalCommitted: money(capital),
        joined: member.joined_date ? new Date(member.joined_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recently",
        sponsorId,
        photo: member.avatar_url || fallbackAvatar(member),
      };
    });

  return assignLevels([root, ...livePeople]);
}

function assignLevels(input: ReferralPerson[]) {
  const byId = new Map(input.map((person) => [person.id, { ...person }]));
  const children = new Map<string, ReferralPerson[]>();

  for (const person of byId.values()) {
    if (!person.sponsorId || person.id === "lorenzo") continue;
    const parentId = byId.has(person.sponsorId) ? person.sponsorId : "lorenzo";
    person.sponsorId = parentId;
    children.set(parentId, [...(children.get(parentId) || []), person]);
  }

  const root = byId.get("lorenzo") || input[0];
  const queue = [{ person: root, level: 0 }];
  const visited = new Set<string>();

  while (queue.length) {
    const { person, level } = queue.shift()!;
    if (visited.has(person.id)) continue;
    visited.add(person.id);
    person.level = level;
    for (const child of children.get(person.id) || []) queue.push({ person: child, level: level + 1 });
  }

  for (const person of byId.values()) {
    if (!visited.has(person.id) && person.id !== "lorenzo") {
      person.sponsorId = "lorenzo";
      person.level = 1;
    }
  }

  return Array.from(byId.values()).sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));
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
  const [livePeople, setLivePeople] = useState<ReferralPerson[]>(demoPeople);
  const [usingLiveData, setUsingLiveData] = useState(false);
  const [movePersonId, setMovePersonId] = useState("");
  const [moveSponsorId, setMoveSponsorId] = useState("lorenzo");
  const [moveMessage, setMoveMessage] = useState("");
  const [draggingId, setDraggingId] = useState("");
  const isLimitedView = mode !== "admin";

  useEffect(() => {
    let cancelled = false;

    const loadMembers = async () => {
      try {
        const res = await fetch("/api/members", { cache: "no-store" });
        if (!res.ok) return;
        const members = await res.json();
        if (cancelled || !Array.isArray(members) || members.length === 0) return;
        setLivePeople(buildLivePeople(members));
        setUsingLiveData(true);
      } catch (err) {
        console.error("Failed to load live referral network:", err);
      }
    };

    loadMembers();
    return () => { cancelled = true; };
  }, []);

  const visiblePeople = useMemo(() => {
    if (!isLimitedView) return livePeople;
    return livePeople.filter((person) => person.level <= 3).slice(0, 40);
  }, [isLimitedView, livePeople]);
  const visibleById = useMemo(() => new Map(visiblePeople.map((person) => [person.id, person])), [visiblePeople]);
  const getChildren = (id: string) => visiblePeople.filter((person) => person.sponsorId === id);

  const root = visibleById.get(rootId) || visiblePeople[0] || rootPerson;
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
    ? "Admin can see the full live organization tree. New confirmed members are placed automatically under their sponsor/upline, and members without a sponsor are placed under Lorenzo."
    : "This is your referral view. Select a person to open their referrals, or press View Upline to see who brought them in. Builder visibility is capped at L1-L3 and 40 total people including you.";
  const totalCount = isLimitedView ? Math.min(visiblePeople.length, 40) : visiblePeople.length;

  const showUpline = (person: ReferralPerson) => {
    setUplineId(person.id);
  };

  const openPerson = (person: ReferralPerson) => {
    setRootId(person.id);
    setUplineId(null);
  };

  const referralLink = (person: ReferralPerson) => {
    if (typeof window === "undefined") return `/invest-now?ref=${encodeURIComponent(person.id)}`;
    return `${window.location.origin}/invest-now?ref=${encodeURIComponent(person.id)}`;
  };

  const copyReferralLink = async (person: ReferralPerson) => {
    try {
      await navigator.clipboard.writeText(referralLink(person));
      setMoveMessage(`${person.name}'s referral link copied.`);
      setTimeout(() => setMoveMessage(""), 2600);
    } catch (err) {
      console.error("Could not copy referral link:", err);
    }
  };

  const canMoveUnder = (personId: string, sponsorId: string) => {
    if (!personId || personId === "lorenzo" || personId === sponsorId) return false;
    const descendants = new Set<string>();
    let current = getChildren(personId);
    while (current.length) {
      current.forEach((person) => descendants.add(person.id));
      current = current.flatMap((person) => getChildren(person.id));
    }
    return !descendants.has(sponsorId);
  };

  const saveUpline = async (personId = movePersonId, sponsorId = moveSponsorId) => {
    if (!canMoveUnder(personId, sponsorId)) {
      setMoveMessage("That move is not allowed because it would place someone under themselves or their own downline.");
      return;
    }

    const person = livePeople.find((item) => item.id === personId);
    const sponsorPerson = livePeople.find((item) => item.id === sponsorId);
    if (!person || !sponsorPerson) return;

    const nextPeople = assignLevels(livePeople.map((item) => (
      item.id === personId ? { ...item, sponsorId } : item
    )));
    setLivePeople(nextPeople);
    setMovePersonId(personId);
    setMoveSponsorId(sponsorId);
    setMoveMessage(`${person.name} moved under ${sponsorPerson.name}.`);

    try {
      await fetch("/api/members", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: personId, sponsor_id: sponsorId }),
      });
    } catch (err) {
      console.error("Failed to save upline:", err);
      setMoveMessage("The view updated, but saving to Supabase failed. Please try again.");
    }
  };

  const sponsor = uplineId ? visibleById.get(visibleById.get(uplineId)?.sponsorId || "") : null;
  const uplinePerson = uplineId ? visibleById.get(uplineId) : null;

  const renderPerson = (person: ReferralPerson, isRoot = false) => (
    <button
      key={`${person.id}-${isRoot ? "root" : "node"}`}
      type="button"
      onClick={() => openPerson(person)}
      draggable={mode === "admin" && person.id !== "lorenzo"}
      onDragStart={() => setDraggingId(person.id)}
      onDragOver={(event) => {
        if (mode === "admin") event.preventDefault();
      }}
      onDrop={(event) => {
        event.preventDefault();
        if (mode === "admin" && draggingId) saveUpline(draggingId, person.id);
      }}
      className={`sn-ref-node ${isRoot ? "sn-ref-root" : ""}`}
    >
      <span className="sn-ref-level">{levelLabel(person, root)}</span>
      <img src={person.photo} alt={`${person.name} profile`} className="sn-ref-photo" />
      <strong>{person.name}</strong>
      <small>{person.role}</small>
      <span className="sn-ref-meta">{person.units} Units · {person.capitalCommitted}</span>
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
      {(mode === "admin" || mode === "builder") ? (
        <span
          role="button"
          tabIndex={0}
          className="sn-ref-link"
          onClick={(event) => {
            event.stopPropagation();
            copyReferralLink(person);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
              copyReferralLink(person);
            }
          }}
        >
          <Copy size={12} />
          Referral Link
        </span>
      ) : null}
      {mode === "admin" && person.id !== "lorenzo" ? (
        <span
          role="button"
          tabIndex={0}
          className="sn-ref-move"
          onClick={(event) => {
            event.stopPropagation();
            setMovePersonId(person.id);
            setMoveSponsorId(person.sponsorId || "lorenzo");
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
              setMovePersonId(person.id);
              setMoveSponsorId(person.sponsorId || "lorenzo");
            }
          }}
        >
          Change Upline
        </span>
      ) : null}
    </button>
  );

  const movablePeople = visiblePeople.filter((person) => person.id !== "lorenzo");
  const sponsorOptions = visiblePeople.filter((person) => person.id !== movePersonId);
  const movingPerson = visibleById.get(movePersonId);

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

      <p className="sn-ref-copy">{scopeCopy} {usingLiveData ? "Live member data is connected." : "Showing sample structure until live members are available."}</p>

      {moveMessage ? <div className="sn-ref-message">{moveMessage}</div> : null}

      {mode === "admin" ? (
        <div className="sn-ref-admin-tools">
          <div>
            <b>Move Member / Change Upline</b>
            <span>Click Change Upline on a person, or drag a person onto the new upline card.</span>
          </div>
          <select value={movePersonId} onChange={(event) => {
            const nextPerson = visibleById.get(event.target.value);
            setMovePersonId(event.target.value);
            setMoveSponsorId(nextPerson?.sponsorId || "lorenzo");
          }}>
            <option value="">Select member</option>
            {movablePeople.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}
          </select>
          <select value={moveSponsorId} onChange={(event) => setMoveSponsorId(event.target.value)} disabled={!movePersonId}>
            {sponsorOptions.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}
          </select>
          <button type="button" onClick={() => saveUpline()} disabled={!movePersonId}>
            <Save size={14} />
            Save Upline
          </button>
          {movingPerson ? <small>{movingPerson.name} will be moved under {visibleById.get(moveSponsorId)?.name || "selected upline"}.</small> : null}
        </div>
      ) : null}

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
          <span><TreePine size={16} /> {mode === "admin" ? "Live depth" : "L1-L3 · 40 max"}</span>
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
