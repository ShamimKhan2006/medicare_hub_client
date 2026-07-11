import Banner from "@/components/Banner";
import Testimonial from "@/components/Testimonial";
import TeamInfo from "@/components/TeamInfo";
import HowCanWeHelp from "@/components/HowCanWeHelp";
import LimitData from "@/components/LimitData";
import NewsletterSection from "@/components/NewsletterSection";
import MedicareUpdates from "@/components/MedicareUpdates";



export default function Home() {
  return (
    <div>
       <Banner/> 
       <LimitData/>
       <Testimonial/>
       <MedicareUpdates/>
       <TeamInfo/>
       <HowCanWeHelp/> 
       <NewsletterSection/>
    </div>
  );
}
