export const paths: Record<string,string>={arrow:'M4 12h16m-6-6 6 6-6 6',mail:'M3 5h18v14H3z m0 0 9 7 9-7',phone:'M7 3H3v4c0 8 6 14 14 14h4v-4l-5-2-2 2c-3-1-6-4-7-7l2-2z',file:'M14 2H5v20h14V7z M14 2v6h5 M8 13h8 M8 17h6',download:'M12 3v12m-5-5 5 5 5-5 M4 16v5h16v-5',code:'m8 5-6 7 6 7 M16 5l6 7-6 7 M14 3l-4 18',layers:'m12 2 10 5-10 5L2 7z M2 12l10 5 10-5 M2 17l10 5 10-5',globe:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 12h18 M12 3c-5 6-5 12 0 18 5-6 5-12 0-18',star:'m12 2 3 6 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1z',briefcase:'M3 7h18v14H3z M8 7V3h8v4 M3 12h18 M10 11v3h4v-3',graduation:'m12 3 11 5-11 5L1 8z M5 10v7q7 5 14 0v-7 M23 8v10',send:'m22 2-7 20-4-9-9-4z M11 13 22 2',calendar:'M3 5h18v16H3z M7 2v6 M17 2v6 M3 10h18 M7 14h2 M12 14h2 M7 18h2 M12 18h2',pin:'M19 9c0 6-7 13-7 13S5 15 5 9a7 7 0 1 1 14 0 M15 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0',copy:'M8 8h13v13H8z M16 8V3H3v13h5',external:'M13 3h8v8 M21 3 10 14 M9 3H3v18h18v-6'};
export const skills: {name:string; icon:string}[] = [
  {name:'React', icon:'/assets/skills/react.svg'},
  {name:'Next.js', icon:'/assets/skills/nextjs.svg'},
  {name:'TypeScript', icon:'/assets/skills/typescript.svg'},
  {name:'Java', icon:'/assets/skills/java.svg'},
  {name:'Spring Boot', icon:'/assets/skills/spring.svg'},
  {name:'Node.js', icon:'/assets/skills/nodejs.svg'},
  {name:'Tailwind CSS', icon:'/assets/skills/tailwindcss.svg'},
  {name:'PostgreSQL', icon:'/assets/skills/postgresql.svg'},
  {name:'MongoDB', icon:'/assets/skills/mongodb.svg'},
  {name:'Docker', icon:'/assets/skills/docker.svg'},
  {name:'Git', icon:'/assets/skills/git.svg'},
  {name:'Figma', icon:'/assets/skills/figma.svg'},
];
export const projects=[
{title:'Stayzi — SaaS Website',label:'Stayzi',type:'SaaS platform',theme:'stayzi',description:'A modern product website with a focus on performance and SEO.',tags:['Next.js','Tailwind','TypeScript'],details:'A presentation website for the Stayzi hospitality platform, with work on responsive layouts, image optimization, and mobile performance.',focus:'Performance, clear product storytelling, and a consistent experience across screen sizes.'},
{title:'E-Commerce Platform',label:'Digital goods.',type:'E-commerce concept',theme:'commerce',description:'A bilingual digital storefront concept with manual product delivery.',tags:['React','Node.js','MongoDB'],details:'A storefront concept for a small catalog of digital products, with French and English content and delivery by email or WhatsApp.',focus:'A clear shopping journey, approachable product information, and direct customer contact. This project is presented as a concept.'},
{title:'Supplier Scraper',label:'Supplier',type:'Research tool',theme:'supplier',description:'A supplier research tool for Moroccan wholesale businesses.',tags:['Python','FastAPI','Shadcn UI'],details:'Supplier research work that collects public business details, organizes sources, and prepares useful contact information for Excel export.',focus:'Flexible searches, traceable source links, and practical contact data.'},
{title:'CST School',label:'CST School',type:'Learning management',theme:'school',description:'An online training platform for courses, messaging, and progress.',tags:['PHP','Twig','MySQL'],details:'A full stack online training management system with users, courses, messaging, payments, and progress tracking.',focus:'Object-oriented PHP, MVC architecture, Twig templates, and a relational MySQL database.'},
{title:'BankManager',label:'BankManager',type:'Java application',theme:'bank',description:'A console application for banking operations and financial reports.',tags:['Java','PostgreSQL','JDBC'],details:'A backend console project for managing bank accounts, transactions, loans, and financial reports.',focus:'Java collections and streams, JDBC database access, and the Java Time API.'}
];
export const navigation=["Home","About","Skills","Experience","Education","Projects","Contact"].map(label=>({label,href:"#"+label.toLowerCase()}));
