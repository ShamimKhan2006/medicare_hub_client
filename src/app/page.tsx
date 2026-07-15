import Banner from "@/components/Banner";
import Testimonial from "@/components/Testimonial";
import TeamInfo from "@/components/TeamInfo";
import HowCanWeHelp from "@/components/HowCanWeHelp";
import LimitData from "@/components/LimitData";
import NewsletterSection from "@/components/NewsletterSection";
import MedicareUpdates from "@/components/MedicareUpdates";

import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <div>
      <Reveal>

       <Banner/> 

      </Reveal>
      <Reveal>

        <LimitData/>

      </Reveal>
      <Reveal>

          <Testimonial/>

      </Reveal>
      <Reveal>

         <MedicareUpdates/>

      </Reveal>
      <Reveal>

         <TeamInfo/>

      </Reveal>
      <Reveal>

        <HowCanWeHelp/> 

      </Reveal>
      <Reveal>

          <NewsletterSection/>

      </Reveal>

    
     
       
       
       
     
    </div>
  );
}
