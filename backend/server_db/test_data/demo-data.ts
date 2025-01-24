import { initDB, initData } from "../../../test/utils/mock-data";
import { GroupMembers } from "../../src/models/GroupMembers";
import { Student } from "../../src/models/Student";
import { StudentGroup } from "../../src/models/StudentGroup";

const NAMES = [
  "Curious Minds",
  "Brainstormers",
  "Dreamers of Knowledge",
  "The Brainiacs",
  "Study Squad",
  "The Intellectuals",
  "Coffee & Books",
  "The Geniuses",
  "Success Team",
  "Focus Group",
];

const DESCRIPTIONS = [
  "A group of inquisitive individuals, always eager to learn and explore new concepts.",
  "Creative thinkers who gather together to generate and share innovative ideas.",
  "Visionaries who aim to expand their minds and achieve intellectual greatness.",
  "A team of sharp minds, always ready to tackle challenges and solve complex problems.",
  "A dedicated group of students working together to succeed and master their subjects.",
  "Deep thinkers who engage in thoughtful discussions and explore profound ideas.",
  "A cozy group that blends study sessions with caffeine and a passion for reading.",
  "A collective of brilliant minds who bring their intelligence together to excel academically.",
  "A group focused on achieving academic success through teamwork and determination.",
  "A team of focused individuals working collaboratively to reach their goals and improve skills.",
];

const COURSES = [
  "DIGITAL SIGNAL & IMAGE PROCESSING",
  "DISTRIBUTED COMPUTING",
  "MACHINE LEARNING",
  "AUGMENTED REALITY",
  "COMPUTATIONAL VISION",
  "DEEP LEARNING",
  "ADDITIONAL USEFUL KNOWLEDGE",
  "COMPUTATIONAL NEUROENGINEERING",
  "COMPUTER GRAPHICS",
  "CAPSTONE",
  "TOPICS IN COMPUTER SCIENCE",
  "DATA WAREHOUSING",
  "INTERNET OF THINGS",
  "NETWORK ANALYSIS",
  "PREDICTIVE ANALYTICS PROJECT",
  "SOFTWARE ENGINEERING FOR DATA ANALYTICS",
  "HUMAN COMPUTER INTERACTION",
  "MACHINE LEARNING AND DATA ANALYSIS",
  "SOFTWARE SYSTEMS DESIGN AND MODELLING",
  "VIRTUALIZATION AND CLOUD COMPUTING",
  "FUNCTIONAL AND SECURITY TESTING TECHNIQUES",
  "IT PROJECT MANAGEMENT",
  "MOBILE DEVELOPMENT",
  "DATA PROTECTION & PRIVACY",
  "DIGITAL FORENSICS",
  "PRINCIPLES AND PARADIGMS OF PROGRAMMING LANGUAGES",
  "DATA VISUALIZATION",
  "HIGH PERFORMANCE COMPUTING",
  "MULTIAGENT SYSTEMS",
  "NATURAL LANGUAGE PROCESSING",
  "COMPUTER GAMES",
  "GEOMETRIC MODELING",
  "TRUSTWORTHY ARTIFICIAL INTELLIGENCE",
  "ADVANCED DATA MANAGEMENT",
  "FINAL DISSERTATION",
];

function choice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

function randint(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min));
}

async function main() {
  initData();
  const mexicanBonora = new Student({
    studentId: 10,
    telegramAccount: 7954951094,
  });
  const lemonGroup = new StudentGroup({
    id: 100,
    name: "lemon",
    description: "Lemonade for everyone",
    course: "Capstone",
    adminId: mexicanBonora.studentId,
    membersLimit: 100,
    isPublic: true,
    gpa: 18,
    telegramLink: "https://t.me/+qAFdy5DLFGMxODk0",
    telegramId: -4735250206,
  });
  const orangeGroup = new StudentGroup({
    id: 101,
    name: "Orange",
    description: "Oranges for everyone",
    course: "Capstone",
    adminId: mexicanBonora.studentId,
    membersLimit: 100,
    isPublic: false,
    gpa: 18,
    telegramLink: "https://t.me/+N781xf5Cc7tmMTE0",
    telegramId: -4676186194,
  });
  Array(10).keys();
  const groups = Array.from(Array(10).keys()).map(
    (i) =>
      new StudentGroup({
        id: 200 + i,
        name: NAMES[i]!,
        description: DESCRIPTIONS[i]!,
        course: choice(COURSES),
        adminId: mexicanBonora.studentId,
        membersLimit: 100,
        isPublic: choice([true, false]),
        gpa: randint(18, 30),
        telegramLink: "INVALID LINK",
      }),
  );
  const members = [
    ...groups.map(
      (g) =>
        new GroupMembers({ studentId: mexicanBonora.studentId, groupId: g.id }),
    ),
    new GroupMembers({
      studentId: mexicanBonora.studentId,
      groupId: lemonGroup.id,
    }),
    new GroupMembers({
      studentId: mexicanBonora.studentId,
      groupId: orangeGroup.id,
    }),
  ];
  await initDB([mexicanBonora, lemonGroup, orangeGroup, ...groups, ...members]);
}

main().catch(console.error);
