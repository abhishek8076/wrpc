import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { BASE_URL, getBannerImg } from "../../../Api/ApiFunctions";

export const Banner = () => {
  const [menudata, setMenuData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(1);

  useEffect(() => {
    async function fetchMenuData() {
      try {
        const data = await getBannerImg();
        setMenuData(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }

    fetchMenuData();
    const newSelectedLanguage = localStorage.getItem("selectedLanguage");
    setSelectedLanguage(newSelectedLanguage || 1);
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  };

  return (
    <div>
      

      {parseInt(selectedLanguage) === 1 ? (
        <>
        <div className="city_main_banner">
        <div className="main-banner-slider">
          <h2>slider </h2>
          <Slider {...settings}>
            {menudata.map((item, index) => (
              <div key={index}>
                <figure className="overlay">
                  <div className="video-container" >
                    <img src={BASE_URL + item.imgpath} alt={`Banner ${index + 1}`} />
                  </div>
                  <div className="banner_text">
                    <div className="small_text animated">Welcome to</div>
                    <div className="medium_text animated">
                      Western Regional Power Committee
                    </div>
                    <div className="large_text animated">{item.u_content}</div>
                    <div className="banner_btn">
                      <a className="theam_btn animated" href="#">
                        Read More
                      </a>
                      <a className="theam_btn animated" href="#">
                        Explore Now
                      </a>
                    </div>
                  </div>
                </figure>
              </div>
            ))}
          </Slider>
        </div>
      </div>
          <section class="notice-section">
            <div class="container">
              <div class="row">
                <div class="col-md-2">
                  <div class="notice-lft">
                    <p>Live Streaming</p>
                  </div>
                </div>
                <div class="col-md-10">
                  <div class="notice-rgt">
                    <div class="marquee-container2">
                      <div class="marquee2">
                        <div class="dial">
                          <div class="d1">
                            <p>
                              <i class="fa-solid fa-bullhorn"></i> &nbsp; Dial
                              Toll-free Helpline Number 1800-121-5555 for all
                              queries and grievances on household
                              electrification under Saubhagya.
                            </p>
                          </div>
                          <div class="d2">
                            <p>
                              <i class="fa-solid fa-bullhorn"></i> &nbsp; Dial
                              '1912' for Electricity Complaints across India and
                              for more Information download 'URJA' App
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
        <div className="city_main_banner">
        <div className="main-banner-slider">
          <h2>slider </h2>
          <Slider {...settings}>
            {menudata.map((item, index) => (
              <div key={index}>
                <figure className="overlay">
                  <div className="video-container">
                    <img src={item.imgpath} alt={`Banner ${index + 1}`} />
                  </div>
                  <div className="banner_text">
                    <div className="small_text animated">पश्चिम क्षेत्रीय विद्युत् समिति में </div>
                    <div className="medium_text animated"> आपका स्वागत है 
                    </div>
                    <div className="large_text animated">{item.u_content}</div>
                    <div className="banner_btn">
                      <a className="theam_btn animated" href="#">
                      और पढ़ें
                      </a>
                      <a className="theam_btn animated" href="#">
                      अभी अन्वेषण करें
                      </a>
                    </div>
                  </div>
                </figure>
              </div>
            ))}
          </Slider>
        </div>
      </div>
          <section class="notice-section">
            <div class="container">
              <div class="row">
                <div class="col-md-2">
                  <div class="notice-lft">
                    <p>सीधा आ रहा है</p>
                  </div>
                </div>
                <div class="col-md-10">
                  <div class="notice-rgt">
                    <div class="marquee-container2">
                      <div class="marquee2">
                        <div class="dial">
                          <div class="d1">
                            <p>
                              <i class="fa-solid fa-bullhorn"></i> &nbsp;
                              सौभाग्य के तहत घरेलू विद्युतीकरण पर सभी प्रश्नों
                              और शिकायतों के लिए टोल-फ्री हेल्पलाइन नंबर
                              1800-121-5555 डायल करें।
                            </p>
                          </div>
                          <div class="d2">
                            <p>
                              <i class="fa-solid fa-bullhorn"></i> &nbsp; पूरे
                              भारत में बिजली की शिकायतों के लिए '1912' डायल करें
                              और अधिक जानकारी के लिए 'ऊर्जा' ऐप डाउनलोड करें
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
