"use client";
import ContactUs from '@/components/contact-us';
import { getClientSideUser } from '@/hooks/getClientSideUser';
const Page = () => {
    
  const tempUserId:any =  getClientSideUser();
  console.log("tempUserId",tempUserId);
    return (
        
        <>
            <ContactUs />
        </>
    );
}

export default Page;
