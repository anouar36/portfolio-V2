import type { Metadata } from 'next';
import '../style.css';
import './motion.css';
import './header.css';
import './choreography.css';
import './laptop-experience.css';
import './offline-footer.css';
export const metadata: Metadata = { title:'Anouar Ech-Charai — Creative Developer', description:'Full Stack Developer & Designer. Creative ideas, thoughtful code, real impact.', icons: {icon:'/assets/favicon.svg'} };
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
