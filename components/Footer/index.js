import React from "react";
import { Divider } from "antd";
import Image from "next/image";
const Footer = () => {
  return (
    <>

      <div className="p-10 mainfooter">
        {/* <div className=" p-40"> */}
        <div className="lg:grid xl:grid xl:grid-flow-row lg:grid-flow-col">

        <div>


          <div>
            <img
              src="/images/home/logo/logo_white_text.png"
              itemProp="image"
              alt="main BannerImage"
            />
          </div>
          <div className="Footer-text py-6">Head Office
          </div>

          <div className="Footer-text2 pb-6">22/18, 2nd Floor, Row B1,Opp. C2 Gate,<br /> Near Ansal Corporate Plaza,<br />
            Gurgaon, India, 122017
          </div>

          <div className="Footer-text4 mb-6">
            <span className="Footer-text3">Toll Free:</span> 1800 1209 7225<br />
            <span className="Footer-text3">Email:</span> inquiry@whiteglove.co.in<br />
          </div>



        </div>
        <div>
        
        <div className="grid grid-cols-2 Footer-text4 gap-2">

          <div className="Footer-text5">Our Divisions</div>
          <div className="Footer-text5">Contact Us</div>
          <div>White Glove</div>
          <div>Get In Touch</div>
          <div>FLITTE Logistics</div>
          <div>Global Network</div>

        </div>


        <div className="grid grid-cols-2 Footer-text4 gap-2 my-9">

          <div className="Footer-text5">Services</div>
          <div className="Footer-text5">Company</div>
          <div>Domestic Relocation</div>
          <div>About us</div>
          <div>International Relocation</div>
          <div>FAQs</div>
          <div>Corporate Relocation</div>
          <div>Careers</div>
          <div>Storage</div>
          <div>Blogs</div>

        </div>

        <div className="flex flex-col Footer-SubSribe-bg justify-center items-center p-4 mb-20">
          <div className="Footer-text6 text-center">
            Subscribe to our Newsletter
          </div>
          {/* <form action="#"> 
            <input type="text" value="Submit" />
          </form> */}
          <button className="yellowButton text-center  py-4 px-28 mt-6">Subscribe</button>
        </div>
        </div>


        </div>
        <div className=" px-2 Footer-text4 text-center">

          <div className="flex flex-rows justify-between pb-6">
            <div>Privacy Policy</div>
            <div>Terms and Condition</div>
          </div>

          <div className="copyright-text pb-6">Copyright © 2022 White Glove, All Rights Reserved</div>

          <div className="flex flex-row justify-between">
            <div className="Social_media-box p-2.5">
              <img src="/images/index_image/Facebook.png" itemProp="image"
                alt="Worldwide delivery " />
            </div>
            <div className="Social_media-box p-2.5">
              <img src="/images/index_image/Subtract.png" itemProp="image"
                alt="Worldwide delivery " />
            </div>
            <div className="Social_media-box p-2.5">
              <img src="/images/index_image/Twitter.png" itemProp="image"
                alt="Worldwide delivery " />
            </div>
            <div className="Social_media-box p-2.5">
              <img src="/images/index_image/LinkedIn.png" itemProp="image"
                alt="Worldwide delivery " />
            </div>

          </div>
        </div>

        {/* </div> */}
      </div>
    </>
    // <div className="footerLayout">
    //   <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-6 footerSpan">
    //     <div className="col-span-2 mb-8">
    //       <img
    //         className="w-96"
    //         src="/images/home/logo/logo-white.png"
    //         itemProp="image"
    //         alt="main BannerImage"
    //       />
    //     </div>
    //     <div className="col-span-4">
    //       <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4">
    //         <div>
    //           <div className="footerTitle mb-16">Our Divisions</div>
    //           <div className="footerLink mb-4">White Glove</div>
    //           <div className="footerLink mb-16">FLITTE Logistics</div>
    //         </div>
    //         <div>
    //           <div className="footerTitle mb-16">Career</div>
    //           <div className="footerLink mb-4">Available Positions</div>
    //           <div className="footerLink mb-16">Job Application</div>
    //         </div>
    //         <div>
    //           <div className="footerTitle mb-16">Contact Us</div>
    //           <div className="footerLink mb-4">Get In Touch</div>
    //           <div className="footerLink mb-4">FAQ Page</div>
    //           <div className="footerLink mb-16">Global Network</div>
    //         </div>
    //         <div>
    //           <div className="footerTitle mb-16">Latest News</div>
    //           <div className="footerLink mb-4">
    //             Facing Problem While Moving?
    //           </div>
    //           <div className="footerLink mb-4">A Sustainable Future</div>
    //           <div className="footerLink mb-16">Fresh Start</div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <Divider />
    // <div className="copyRight grid  grid-cols-6 p-8">
    //   <div className="col-start-1 col-span-2 ">
    //     Made with <span className="heartColor">❤</span> By Infinity Coder`s
    //   </div>
    //   <div className="col-start-3 col-span-3 ml-16">
    //     © 2022 White Glove, All Rights Reserved
    //   </div>
    //   <div className="col-start-6">
    //     <div>Facebook</div>
    //   </div>
    // </div>
  );
};

export default Footer;
