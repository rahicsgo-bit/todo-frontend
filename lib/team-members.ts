export interface TeamMember {
  id: string;
  name: string;
  color: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  { id: "alice", name: "Alice", color: "indigo" },
  { id: "bob", name: "Bob", color: "teal" },
  { id: "carol", name: "Carol", color: "pink" },
  { id: "dave", name: "Dave", color: "orange" },
  { id: "eve", name: "Eve", color: "cyan" },
];

export function getMemberById(id: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.id === id);
}
