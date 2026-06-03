import type { backendInterface, Announcement, BibleReading, Class, Hymn, LectureMaterial, MensItem, MothersItem, OfferingInfo, ProgramItem, Sermon, ServiceBookItem, YouthItem, UserRole } from "../backend";
import { ExternalBlob } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

export const mockBackend = {
  // Hymns
  listHymns: async () => [
    { id: BigInt(1), number: BigInt(1), title: "All Things Bright and Beautiful", lyrics: "All things bright and beautiful,\nAll creatures great and small,\nAll things wise and wonderful,\nThe Lord God made them all.\n\nEach little flower that opens,\nEach little bird that sings,\nHe made their glowing colours,\nHe made their tiny wings.", createdAt: now },
    { id: BigInt(2), number: BigInt(23), title: "The Lord Is My Shepherd", lyrics: "The Lord is my shepherd;\nI have all that I need.\nHe lets me rest in green meadows;\nHe leads me beside peaceful streams.\n\nHe renews my strength.\nHe guides me along right paths,\nBringing honour to His name.", createdAt: now },
    { id: BigInt(3), number: BigInt(45), title: "Abide With Me", lyrics: "Abide with me; fast falls the eventide;\nThe darkness deepens; Lord, with me abide!\nWhen other helpers fail and comforts flee,\nHelp of the helpless, oh, abide with me.", createdAt: now },
    { id: BigInt(4), number: BigInt(67), title: "Amazing Grace", lyrics: "Amazing grace! How sweet the sound\nThat saved a wretch like me!\nI once was lost, but now am found;\nWas blind, but now I see.", createdAt: now },
    { id: BigInt(5), number: BigInt(89), title: "Holy, Holy, Holy", lyrics: "Holy, holy, holy! Lord God Almighty!\nEarly in the morning our song shall rise to Thee;\nHoly, holy, holy! Merciful and mighty!\nGod in three Persons, blessed Trinity!", createdAt: now },
  ] as Hymn[],
  addHymn: async (input) => ({ id: BigInt(99), ...input, createdAt: now }) as Hymn,
  updateHymn: async (id, input) => ({ id, ...input, createdAt: now }) as Hymn,
  deleteHymn: async () => true,
  getHymn: async (id) => ({ id, number: BigInt(1), title: "All Things Bright and Beautiful", lyrics: "All things bright and beautiful...", createdAt: now }) as Hymn,
  searchHymns: async (q) => [
    { id: BigInt(1), number: BigInt(1), title: "All Things Bright and Beautiful", lyrics: "All things bright and beautiful...", createdAt: now },
  ] as Hymn[],

  // Bible Readings
  listBibleReadings: async () => [
    { id: BigInt(1), reference: "Psalm 23:1-6", text: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul. He guides me along the right paths for his name's sake.", isReadingOfDay: true, createdAt: now },
    { id: BigInt(2), reference: "John 3:16-17", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. For God did not send his Son into the world to condemn the world, but to save the world through him.", isReadingOfDay: false, createdAt: now },
    { id: BigInt(3), reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", isReadingOfDay: false, createdAt: now },
  ] as BibleReading[],
  addBibleReading: async (input) => ({ id: BigInt(99), ...input, isReadingOfDay: false, createdAt: now }) as BibleReading,
  updateBibleReading: async (id, input) => ({ id, ...input, isReadingOfDay: false, createdAt: now }) as BibleReading,
  deleteBibleReading: async () => true,
  getBibleReading: async (id) => ({ id, reference: "Psalm 23:1-6", text: "The Lord is my shepherd...", isReadingOfDay: true, createdAt: now }) as BibleReading,
  setReadingOfDay: async () => true,

  // Announcements
  listAnnouncements: async () => [
    { id: BigInt(1), title: "Sunday Service — 18th May 2026", body: "We warmly welcome all members to the Sunday morning service. The service begins at 9:00 AM. Holy Communion will be administered today. All are encouraged to come early for fellowship.", pinned: true, createdAt: now },
    { id: BigInt(2), title: "Choir Practice — This Saturday", body: "The St. James choir is requested to attend rehearsal this Saturday at 3:00 PM in the main hall. New members are most welcome to join.", pinned: false, createdAt: now },
    { id: BigInt(3), title: "Harvest Festival — 1st June 2026", body: "Our annual Harvest Festival will be held on 1st June 2026. Members are encouraged to contribute generously. Donations of foodstuffs and financial contributions are welcome.", pinned: false, createdAt: now },
  ] as Announcement[],
  addAnnouncement: async (input) => ({ id: BigInt(99), ...input, createdAt: now }) as Announcement,
  updateAnnouncement: async (id, input) => ({ id, ...input, createdAt: now }) as Announcement,
  deleteAnnouncement: async () => true,
  getAnnouncement: async (id) => ({ id, title: "Sunday Service", body: "Service begins at 9:00 AM.", pinned: true, createdAt: now }) as Announcement,

  // Sunday Program
  listProgramItems: async () => [
    { id: BigInt(1), order: BigInt(1), time: "8:45 AM", activity: "Preparation and Fellowship", createdAt: now },
    { id: BigInt(2), order: BigInt(2), time: "9:00 AM", activity: "Opening Hymn", createdAt: now },
    { id: BigInt(3), order: BigInt(3), time: "9:10 AM", activity: "Opening Prayer", createdAt: now },
    { id: BigInt(4), order: BigInt(4), time: "9:20 AM", activity: "Bible Reading", createdAt: now },
    { id: BigInt(5), order: BigInt(5), time: "9:35 AM", activity: "Notices & Announcements", createdAt: now },
    { id: BigInt(6), order: BigInt(6), time: "9:45 AM", activity: "Sermon", createdAt: now },
    { id: BigInt(7), order: BigInt(7), time: "10:30 AM", activity: "Offering", createdAt: now },
    { id: BigInt(8), order: BigInt(8), time: "10:45 AM", activity: "Closing Hymn & Benediction", createdAt: now },
  ] as ProgramItem[],
  addProgramItem: async (input) => ({ id: BigInt(99), ...input, createdAt: now }) as ProgramItem,
  updateProgramItem: async (id, input) => ({ id, ...input, createdAt: now }) as ProgramItem,
  deleteProgramItem: async () => true,
  getProgramItem: async (id) => ({ id, order: BigInt(1), time: "9:00 AM", activity: "Opening Hymn", createdAt: now }) as ProgramItem,

  // Sermons
  listSermons: async () => [
    { id: BigInt(1), preacher: "Rev. James Ochieng", theme: "Walking in Faith", scriptureRef: "Hebrews 11:1-6", date: now, notes: "Faith is confidence in what we hope for and assurance about what we do not see.", createdAt: now },
    { id: BigInt(2), preacher: "Deacon Mary Adhiambo", theme: "The Power of Prayer", scriptureRef: "Matthew 6:9-13", date: now - BigInt(7 * 24 * 60 * 60 * 1_000_000_000), notes: "Prayer is the key that opens the doors of heaven.", createdAt: now },
  ] as Sermon[],
  addSermon: async (input) => ({ id: BigInt(99), ...input, createdAt: now }) as Sermon,
  updateSermon: async (id, input) => ({ id, ...input, createdAt: now }) as Sermon,
  deleteSermon: async () => true,
  getSermon: async (id) => ({ id, preacher: "Rev. James Ochieng", theme: "Walking in Faith", scriptureRef: "Hebrews 11:1-6", date: now, notes: "", createdAt: now }) as Sermon,

  // Sunday School
  listClasses: async () => [
    { id: BigInt(1), name: "Beginners (Ages 3-5)", teacher: "Mrs. Grace Auma", description: "Basic Bible stories and colouring activities for the youngest members.", schedule: "Sundays 9:00 AM - 10:30 AM", createdAt: now },
    { id: BigInt(2), name: "Primary (Ages 6-10)", teacher: "Mr. Peter Omondi", description: "Interactive lessons covering Old and New Testament stories.", schedule: "Sundays 9:00 AM - 10:30 AM", createdAt: now },
    { id: BigInt(3), name: "Junior (Ages 11-14)", teacher: "Mrs. Faith Nekesa", description: "In-depth Bible study and Christian living principles.", schedule: "Sundays 9:00 AM - 10:30 AM", createdAt: now },
  ] as Class[],
  addClass: async (input) => ({ id: BigInt(99), ...input, createdAt: now }) as Class,
  updateClass: async (id, input) => ({ id, ...input, createdAt: now }) as Class,
  deleteClass: async () => true,
  getClass: async (id) => ({ id, name: "Primary (Ages 6-10)", teacher: "Mr. Peter Omondi", description: "Interactive lessons.", schedule: "Sundays 9:00 AM", createdAt: now }) as Class,
  listLectureMaterials: async () => [] as LectureMaterial[],
  addLectureMaterial: async (input) => ({ id: BigInt(99), ...input, uploadedAt: now }) as LectureMaterial,
  deleteLectureMaterial: async () => true,

  // Youth Ministry
  listYouthItems: async () => [
    { id: BigInt(1), title: "Youth Fellowship Meeting", description: "Monthly youth gathering for worship, Bible study and fellowship.", leader: "Youth Coordinator James Wafula", category: "Fellowship", date: now, createdAt: now },
    { id: BigInt(2), title: "Community Service Day", description: "Youth outreach to the local community — cleaning and supporting the elderly.", leader: "Youth Coordinator James Wafula", category: "Outreach", date: now + BigInt(7 * 24 * 60 * 60 * 1_000_000_000), createdAt: now },
  ] as YouthItem[],
  addYouthItem: async (input) => ({ id: BigInt(99), ...input, createdAt: now }) as YouthItem,
  updateYouthItem: async (id, input) => ({ id, ...input, createdAt: now }) as YouthItem,
  deleteYouthItem: async () => true,
  getYouthItem: async (id) => ({ id, title: "Youth Fellowship", description: "Monthly meeting.", leader: "James Wafula", category: "Fellowship", createdAt: now }) as YouthItem,

  // Mothers' Union
  listMothersItems: async () => [
    { id: BigInt(1), title: "Mothers' Union Monthly Meeting", description: "Regular meeting for prayer, Bible study and welfare matters.", leader: "Chairlady Mrs. Elizabeth Ouma", category: "Meeting", date: now, createdAt: now },
    { id: BigInt(2), title: "Hospital Visitation Programme", description: "Visiting and supporting patients at the local hospital.", leader: "Mrs. Agnes Chebet", category: "Outreach", createdAt: now },
  ] as MothersItem[],
  addMothersItem: async (input) => ({ id: BigInt(99), ...input, createdAt: now }) as MothersItem,
  updateMothersItem: async (id, input) => ({ id, ...input, createdAt: now }) as MothersItem,
  deleteMothersItem: async () => true,
  getMothersItem: async (id) => ({ id, title: "Mothers' Meeting", description: "Monthly gathering.", leader: "Mrs. Elizabeth Ouma", category: "Meeting", createdAt: now }) as MothersItem,

  // Men's Association
  listMensItems: async () => [
    { id: BigInt(1), title: "Men's Fellowship Breakfast", description: "Monthly breakfast meeting for prayer, discussion and mentorship.", leader: "Chairman Mr. David Barasa", category: "Fellowship", date: now, createdAt: now },
    { id: BigInt(2), title: "Church Building Maintenance", description: "Men's association working together to maintain the church premises.", leader: "Mr. Samuel Wekesa", category: "Service", createdAt: now },
  ] as MensItem[],
  addMensItem: async (input) => ({ id: BigInt(99), ...input, createdAt: now }) as MensItem,
  updateMensItem: async (id, input) => ({ id, ...input, createdAt: now }) as MensItem,
  deleteMensItem: async () => true,
  getMensItem: async (id) => ({ id, title: "Men's Fellowship", description: "Monthly breakfast.", leader: "David Barasa", category: "Fellowship", createdAt: now }) as MensItem,

  // Offering
  getOfferingInfo: async () => ({
    mpesaName: "St. James ACK Malaba",
    mpesaNumber: "0720 123 456",
    bankName: "Kenya Commercial Bank",
    bankBranch: "Malaba Branch",
    bankAccount: "1234567890",
    instructions: "For M-Pesa: Go to M-Pesa > Lipa na M-Pesa > Pay Bill > Enter Business Number > Account: ST JAMES ACK. For bank: Visit any KCB branch and deposit to the account above. All contributions support the work of God in our church.",
  }) as OfferingInfo,
  updateOfferingInfo: async () => {},

  // Service Book
  listServiceBookItems: async () => [
    { id: BigInt(1), step: BigInt(1), title: "The Greeting", content: "The Lord be with you.\nAnd also with you.\n\nLet us give thanks to the Lord our God.\nIt is right to give thanks and praise.", createdAt: now },
    { id: BigInt(2), step: BigInt(2), title: "Confession of Sin", content: "Almighty God, our heavenly Father,\nwe have sinned against you and against our neighbour\nin thought and word and deed,\nthrough negligence, through weakness,\nthrough our own deliberate fault.\nWe are truly sorry and repent of all our sins.\nFor the sake of your Son Jesus Christ,\nwho died for us, forgive us all that is past;\nand grant that we may serve you in newness of life\nto the glory of your name. Amen.", createdAt: now },
    { id: BigInt(3), step: BigInt(3), title: "The Collect", content: "Let us pray.\n\nAlmighty God,\nto whom all hearts are open,\nall desires known,\nand from whom no secrets are hidden:\ncleanse the thoughts of our hearts\nby the inspiration of your Holy Spirit,\nthat we may perfectly love you,\nand worthily magnify your holy name;\nthrough Christ our Lord. Amen.", createdAt: now },
  ] as ServiceBookItem[],
  addServiceBookItem: async (input) => ({ id: BigInt(99), ...input, createdAt: now }) as ServiceBookItem,
  updateServiceBookItem: async (id, input) => ({ id, ...input, createdAt: now }) as ServiceBookItem,
  deleteServiceBookItem: async () => true,

  // Authorization
  isCallerAdmin: async () => false,
  // Using the object variant structure often expected by Candid-to-TS generators
  getCallerUserRole: async () => {
    const role: UserRole = { guest: null } as any;
    return role;
  },
  assignCallerUserRole: async () => {},
} as unknown as backendInterface;
