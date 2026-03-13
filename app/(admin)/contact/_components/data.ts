export type Contact = {
  id: string
  name: string
  role: string
  email: string
  phone: string
  location: string
  avatar: string
  avatarFallback: string
}

export const CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Alene",
    role: "Sr. Customer Manager",
    email: "alene.customer@example.com",
    phone: "305-801-5185",
    location: "Afghanistan",
    avatar: "https://i.pravatar.cc/150?img=1",
    avatarFallback: "AL",
  },
  {
    id: "2",
    name: "Agilulf Fuxg",
    role: "Specialist",
    email: "agilulf@example.com",
    phone: "176-935-8571",
    location: "Afghanistan",
    avatar: "https://i.pravatar.cc/150?img=5",
    avatarFallback: "AF",
  },
  {
    id: "3",
    name: "Adaline Bergfalks",
    role: "Shaper",
    email: "adaline@example.com",
    phone: "560-004-2970",
    location: "Afghanistan",
    avatar: "https://i.pravatar.cc/150?img=9",
    avatarFallback: "AB",
  },
  {
    id: "4",
    name: "Keefe",
    role: "Dynamic Operations Officer",
    email: "keefe.ops@example.com",
    phone: "931-061-9817",
    location: "Afghanistan",
    avatar: "https://i.pravatar.cc/150?img=20",
    avatarFallback: "KE",
  },
  {
    id: "5",
    name: "Lazaro",
    role: "Resource Investigator",
    email: "lazaro@example.com",
    phone: "926-106-5572",
    location: "Liberia",
    avatar: "https://i.pravatar.cc/150?img=12",
    avatarFallback: "LA",
  },
  {
    id: "6",
    name: "Hazle",
    role: "Teamworker",
    email: "hazle@example.com",
    phone: "320-804-4140",
    location: "Anguilla",
    avatar: "https://i.pravatar.cc/150?img=15",
    avatarFallback: "HA",
  },
  {
    id: "7",
    name: "Herman Essertg",
    role: "Co-ordinator",
    email: "herman@example.com",
    phone: "460-008-9040",
    location: "Anguilla",
    avatar: "https://i.pravatar.cc/150?img=33",
    avatarFallback: "HE",
  },
  {
    id: "8",
    name: "Wilhelmine Durrg",
    role: "Monitor Evaluator",
    email: "wilhelmine_durrg@example.com",
    phone: "301-961-8187",
    location: "Japan",
    avatar: "https://i.pravatar.cc/150?img=25",
    avatarFallback: "WD",
  },
  {
    id: "9",
    name: "Eadwulf Beckete",
    role: "Implementer",
    email: "eadwulf_beckete@example.com",
    phone: "101-864-4615",
    location: "Denvale",
    avatar: "https://i.pravatar.cc/150?img=52",
    avatarFallback: "EB",
  },
  {
    id: "10",
    name: "Midas",
    role: "Leader",
    email: "midas@example.com",
    phone: "320-804-4140",
    location: "Anguilla",
    avatar: "https://i.pravatar.cc/150?img=45",
    avatarFallback: "MI",
  },
  {
    id: "11",
    name: "Menelaus",
    role: "Facilitator",
    email: "menelaus@example.com",
    phone: "460-008-9040",
    location: "Admin",
    avatar: "https://i.pravatar.cc/150?img=60",
    avatarFallback: "ME",
  },
  {
    id: "12",
    name: "Uranus",
    role: "Facilitator",
    email: "uranus@example.com",
    phone: "320-804-4140",
    location: "Carita",
    avatar: "https://i.pravatar.cc/150?img=62",
    avatarFallback: "UR",
  },
  {
    id: "13",
    name: "Peahen",
    role: "Coach",
    email: "peahen@example.com",
    phone: "301-411-9973",
    location: "Quad",
    avatar: "https://i.pravatar.cc/150?img=47",
    avatarFallback: "PE",
  },
]

export const groupContactsByLetter = (contacts: Contact[]) => {
  const groups: Record<string, Contact[]> = {}
  for (const contact of contacts) {
    const letter = contact.name[0].toUpperCase()
    if (!groups[letter]) groups[letter] = []
    groups[letter].push(contact)
  }
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
}
