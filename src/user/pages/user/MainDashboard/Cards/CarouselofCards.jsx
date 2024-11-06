import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import React from 'react'
import Drafted from "./Drafted";
import PendingforApproval from "./PendingforApproval";
import Approved from "./Approved";
import RoutedforSignature from "./RoutedforSignature";
import Notarized from "./Notarization";
import FiledwithSEC from "./FiledwithSEC";
import Completed from "./Completed";

const CarouselofCards = () => {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

  return (
    <div>
        <Carousel responsive={responsive} draggable={true} slidesToSlide={5}>
            <Drafted />
            <PendingforApproval />
            <Approved />
            <RoutedforSignature />
            <Notarized />
            <FiledwithSEC />
            <Completed />
        </Carousel>
    </div>
  )
}

export default CarouselofCards

