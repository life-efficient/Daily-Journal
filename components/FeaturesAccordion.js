"use client";

import { useState, useRef } from "react";
import Image from "next/image";



// The features array is a list of features that will be displayed in the accordion.
// - title: The title of the feature
// - description: The description of the feature (when clicked)
// - type: The type of media (video or image)
// - path: The path to the media (for better SEO, try to use a local path)
// - format: The format of the media (if type is 'video')
// - alt: The alt text of the image (if type is 'image')
const features = [
  {
    title: "1. Meet the network",
    description:
      "The best way to learn is to be surrounded by people who've done it before. Every day, members of Parapet gather online.",
    type: "video",
    path: "/convospace.mp4",
    format: "video/mp4",

    // svg: (
    //   // <svg
    //   //   xmlns="http://www.w3.org/2000/svg"
    //   //   fill="none"
    //   //   viewBox="0 0 24 24"
    //   //   strokeWidth={1.5}
    //   //   stroke="currentColor"
    //   //   className="w-6 h-6"
    //   // >
    //   //   <path
    //   //     strokeLinecap="round"
    //   //     d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
    //   //   />
    //   // </svg>
    // ),
  },
  {
    title: "2. Access a founder-focused library of technical skills and shortcuts",
    description:
      "Most courses are designed to help you land a job. This is the only one designed to help you launch a product. It covers everything you need to know to build full-stack, AI-powered, secure, monetised products. It features hundreds of proprietary walkthough videos on all aspects of building and launching something, as well as hundreds of curated, public resources from trusted resources.",

    type: "video",
    path: "/convospace.mp4",
    format: "video/mp4",
    // svg: (
    // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >

    //   <path fill="none" d="M0 0h24v24H0z" />

    //   <path
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
    //   />

    //   // </svg>
    // ),
  },
  {
    title: "3. Parapet will guide you through the process of launching a product",
    description:
      "We take proposals for products that solve real problems from our partners as well as our community, then mentor teams of members to develop and launch that solution to the world.",
    type: "video",
    path: "/convospace.mp4",
    format: "video/mp4",

    // svg: (
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     fill="none"
    //     viewBox="0 0 24 24"
    //     strokeWidth={1.5}
    //     stroke="currentColor"
    //     className="w-6 h-6"
    //   >
    //     {/* <path
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
    //     /> */}
    // //   </svg>
    // ),
  },

];

// An SEO-friendly accordion component including the title and a description (when clicked.)
const Item = ({ feature, isOpen, setFeatureSelected }) => {
  const accordion = useRef(null);
  const { title, description, svg } = feature;

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-medium text-left md:text-lg"
        onClick={(e) => {
          e.preventDefault();
          setFeatureSelected();
        }}
        aria-expanded={isOpen}
      >
        <span className={`duration-100 ${isOpen ? "text-primary" : ""}`}>
          {svg}
        </span>
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary font-semibold" : ""
            }`}
        >
          <h3 className="inline">{title}</h3>
        </span>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out text-base-content-secondary overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{description}</div>
      </div>
    </li>
  );
};

// A component to display the media (video or image) of the feature. If the type is not specified, it will display an empty div.
// Video are set to autoplay for best UX.
const Media = ({ feature }) => {
  const { type, path, format, alt } = feature;
  const style = "rounded-lg w-full  ";
  const size = {
    width: 500,
    height: 500,
  };

  if (type === "video") {
    return (
      <div className="rounded-lg overflow-hidden">
        <video
          className={style}
          autoPlay
          muted
          loop
          playsInline
          controls
          width={size.width}
          height={size.height}
        >
          <source src={path} type={format} />
        </video>
      </div>
    );
  } else if (type === "image") {
    return (
      <Image
        src={path}
        alt={alt}
        className={`${style} object-cover object-center`}
        width={size.width}
        height={size.height}
      />
    );
  } else {
    return <div className={`${style} !border-none`}></div>;
  }
};

// A component to display 2 to 5 features in an accordion.
// By default, the first feature is selected. When a feature is clicked, the others are closed.
const FeaturesAccordion = () => {
  const [featureSelected, setFeatureSelected] = useState(0);

  return (
    <section
      className="py-24 md:py-32 space-y-24 md:space-y-32 max-w-7xl mx-auto bg-base-100 "
      id="features"
    >
      <div className="px-8">
        <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24">
          Learn the skills powering the best technical founders
        </h2>
        <div className=" flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="grid grid-cols-1 items-stretch gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20">
            <ul className="w-full">
              {features.map((feature, i) => (
                <Item
                  key={feature.title}
                  index={i}
                  feature={feature}
                  isOpen={featureSelected === i}
                  setFeatureSelected={() => setFeatureSelected(i)}
                />
              ))}
            </ul>

            <Media feature={features[featureSelected]} key={featureSelected} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAccordion;
